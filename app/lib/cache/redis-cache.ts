/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redis } from "ioredis";

import { ICache } from "./cache";

export class RedisCache implements ICache{
    private client: Redis;

    private static instanceOfRedis:RedisCache;

    constructor(redisUrl:string){
        this.client= new Redis(redisUrl);
    }

    static getInstanceOfRedis(redisUrl:string):RedisCache{
        if(!this.instanceOfRedis){
            return this.instanceOfRedis = new RedisCache(redisUrl)
        }
        return this.instanceOfRedis;
    }

    async set(type: string, args: string[], value: any, expirySeconds: number): Promise<void> {
        
        const key = this.generateKey(type,args);

        if (expirySeconds) {
            await this.client.set(key, JSON.stringify(value), 'EX', expirySeconds);
          } else {
            await this.client.set(key, JSON.stringify(value));
        }
    }

    async get(type: string, args: string[]): Promise<any> {
        const key = this.generateKey(type,args);

        const value = await this.client.get(key);

        if(!value){
            return null
        }

        return JSON.parse(value);
    }

    async evict(type: string, args: string[]): Promise<null> {
        const key = this.generateKey(type,args);

        await this.client.del(key);
        return null
    }


    private generateKey(type: string, args: string[]): string {
        return `${type}:${args.join(':')}`;
      }
}