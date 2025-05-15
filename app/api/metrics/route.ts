
import { register, collectDefaultMetrics } from 'prom-client';
import { NextResponse } from 'next/server';


collectDefaultMetrics({ prefix: 'web_server_' });

export async function GET() {
    try {
        const metrics = await register.metrics();
        
        const response = new NextResponse(metrics, { status: 200 });
        response.headers.set('Content-Type', register.contentType);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error('Error fetching metrics:', error);
        return new NextResponse('Error fetching metrics', { status: 500 });
    }
}
