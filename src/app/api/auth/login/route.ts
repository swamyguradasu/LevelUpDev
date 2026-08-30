import { NextRequest, NextResponse } from 'next/server';
import { getStaticProfileByEmail } from '@/lib/csvRoster';
import { verifyUserPassword } from '@/lib/authCredentials';

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

    // 2. Validate password securely (Checks database custom password first, then default registration number)
    const authResult = await verifyUserPassword(cleanEmail, String(password));
    if (!authResult.valid || !authResult.profile) {
      const errorMsg = authResult.isCustom
        ? 'Invalid password. Please use the custom password you set for this account.'
        : 'Invalid password. Please enter your College Registration Number (e.g. 24A21A6145) to sign in.';

      return NextResponse.json({ error: errorMsg }, { status: 401 });
    }

    const validProfile = authResult.profile;

    // 3. Return sanitized static profile, authorization info, and promptChange flag
    return NextResponse.json(
      {
        success: true,
        mustPromptChange: authResult.mustPromptChange,
        isCustomPassword: authResult.isCustom,
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
