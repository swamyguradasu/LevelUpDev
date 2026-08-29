import { NextRequest, NextResponse } from 'next/server';
import { resetAllDynamicDatabase } from '@/lib/dynamicDatabase';
import { getStaticProfileByEmail } from '@/lib/csvRoster';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { adminEmail } = body;

    if (!adminEmail) {
      return NextResponse.json(
        { error: 'Administrator email is required for database reset.' },
        { status: 400 }
      );
    }

    const cleanAdmin = String(adminEmail).trim().toLowerCase();
    const profile = getStaticProfileByEmail(cleanAdmin);

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only platform administrators can execute a database reset.' },
        { status: 403 }
      );
    }

    const result = await resetAllDynamicDatabase();

    return NextResponse.json({
      success: true,
      message: result.message,
      clearedCount: result.clearedUsers,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Reset DB API error:', err);
    return NextResponse.json(
      { error: 'Failed to reset dynamic database.' },
      { status: 500 }
    );
  }
}
