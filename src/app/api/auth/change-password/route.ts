import { NextRequest, NextResponse } from 'next/server';
import { getStaticProfileByEmail } from '@/lib/csvRoster';
import { verifyUserPassword, saveUserCredential } from '@/lib/authCredentials';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, currentPassword, newPassword } = body;

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Email, current password, and new password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanCurrent = String(currentPassword).trim();
    const cleanNew = String(newPassword).trim();

    // 1. Verify user exists in roster
    const profile = getStaticProfileByEmail(cleanEmail);
    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found in LevelUpDev roster.' },
        { status: 404 }
      );
    }

    // 2. Validate new password length and complexity
    if (cleanNew.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (cleanNew === cleanCurrent) {
      return NextResponse.json(
        { error: 'New password cannot be the same as your current password.' },
        { status: 400 }
      );
    }

    // 3. Verify current password
    const authResult = await verifyUserPassword(cleanEmail, cleanCurrent);
    if (!authResult.valid) {
      return NextResponse.json(
        { error: 'Incorrect current password. Please enter your valid current password to proceed.' },
        { status: 401 }
      );
    }

    // 4. Save new password into database
    await saveUserCredential(cleanEmail, cleanNew);

    return NextResponse.json(
      {
        success: true,
        message: '✓ Password successfully changed and secured in database. Please use your new password for all future logins.',
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Change password error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while updating your password.' },
      { status: 500 }
    );
  }
}
