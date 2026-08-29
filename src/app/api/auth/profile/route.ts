import { NextRequest, NextResponse } from 'next/server';
import {
  getStaticProfilesFromCSV,
  getStaticProfileByEmail,
} from '@/lib/csvRoster';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (email) {
      const profile = getStaticProfileByEmail(email);
      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found for this email in CSV.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ profile }, { status: 200 });
    }

    // Return all static profiles for admin / directory
    const profiles = getStaticProfilesFromCSV();
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (err: any) {
    console.error('Profile API error:', err);
    return NextResponse.json(
      { error: 'Failed to load static profile from CSV.' },
      { status: 500 }
    );
  }
}
