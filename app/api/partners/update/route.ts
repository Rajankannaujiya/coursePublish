// app/api/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateBrand } from '@/app/actions/brand';

export async function POST(request: NextRequest) {

  const { partnerId, name, image } = await request.json();
  
  const result = await updateBrand({partnerId:partnerId,brandName:name, brandLogo:image});
  console.log(result);
  
  return NextResponse.json({ success: true,  status:200, result:result});
}