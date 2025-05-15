/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICache } from "./cache";

interface ICacheEntry {
    value: any;
    expiry: number;
  }

export class InMemoryCache implements ICache{

    private inmemoryCacheDb: Map<string, ICacheEntry>;

    private static instanceOfMemoryCache :InMemoryCache;

    constructor(){
        this.inmemoryCacheDb = new Map<string, ICacheEntry>();
    }

    static getInstance(){
        if(!this.instanceOfMemoryCache){
            this.instanceOfMemoryCache = new InMemoryCache();
        }

        return this.instanceOfMemoryCache;
    }

async set(type: string, args: string[], value: any, expirySeconds: number = parseInt(process.env.CACHE_EXPIRES || '100',10)): Promise<void> {
        
    const key = this.generateKey(type, args);

    this.inmemoryCacheDb.set(key, {
        value,
        expiry: new Date().getTime() + expirySeconds * 1000
    })
    }

    async get(type: string, args: string[]): Promise<any> {
        
        const key = this.generateKey(type, args);

        const entry = this.inmemoryCacheDb.get(key);

        if(!entry) return null;

        return entry.value;
    }

    async evict(type: string, args: string[]): Promise<null> {
        const key = this.generateKey(type, args);

        this.inmemoryCacheDb.delete(key);

        return null

    }


    private generateKey(type: string, args: string[]): string {
        return `${type}:${JSON.stringify(args)}`;
      }
}