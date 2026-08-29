import { NextRequest, NextResponse } from 'next/server';
import {
  getStaticProfileByEmail,
  validateMemberCredentials,
  StaticUserProfile,
} from '@/lib/csvRoster';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // 1. Check if member exists in static CSV
    const existingMember = getStaticProfileByEmail(cleanEmail);
    if (!existingMember) {
      return NextResponse.json(
        {
          error:
            'Email address is not in the LevelUpDev Member Profile roster. Please use your @levelupdev.com email.',
        },
        { status: 404 }
      );
    }

    // 2. Validate password securely on server
    const validProfile = validateMemberCredentials(cleanEmail, String(password));
    if (!validProfile) {
      return NextResponse.json(
        {
          error:
            'Invalid password. Please enter your College Registration Number (e.g. 24A21A6145) to sign in.',
        },
        { status: 401 }
      );
    }

    // 3. Return sanitized static profile and authorization info
    return NextResponse.json(
      {
        success: true,
        user: {
          email: validProfile.levelupdevEmail,
          name: validProfile.fullName,
          role: validProfile.role,
          staticProfile: validProfile,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred during authentication.' },
      { status: 500 }
    );
  }
}
