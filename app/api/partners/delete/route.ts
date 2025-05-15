// app/api/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { deleteBrand } from '@/app/actions/brand';

export async function POST(request: NextRequest) {

  const { partnerId } = await request.json();
  
  const result = await deleteBrand(partnerId);
  console.log(result);
  
  return NextResponse.json({ success: true,  status:200, result:result});
}