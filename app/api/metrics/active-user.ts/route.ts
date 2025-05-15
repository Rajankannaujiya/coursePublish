

import { NextResponse } from 'next/server';
import { activeUserGauge } from '@/app/lib/metrics';

export async function DELETE() {
 const currentValue = (await activeUserGauge.get()).values?.[0]?.value

  if (currentValue > 0) {
    activeUserGauge.dec();
  }

  return NextResponse.json({ success: true, value: (await activeUserGauge.get()).values?.[0]?.value });
}
