import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { getStaticProfileByEmail } from '@/lib/csvRoster';
import { normalizeUserId } from '@/lib/dynamicDatabase';
import { InternshipApplication } from '@/data/internshipsData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const role = searchParams.get('role');

    const applications: InternshipApplication[] = [];

    if (isFirebaseConfigured) {
      try {
        const colRef = collection(db, 'internship_applications');
        let q = query(colRef);

        if (email && role !== 'admin') {
          const userId = normalizeUserId(email);
          q = query(colRef, where('user_id', '==', userId));
        }

        const snap = await getDocs(q);
        snap.forEach((d) => {
          applications.push(d.data() as InternshipApplication);
        });
      } catch (fbErr: any) {
        console.warn('Notice: Firestore query fallback for internship_applications:', fbErr?.code || fbErr?.message);
      }
    }

    return NextResponse.json({ applications }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ applications: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      internshipId,
      internshipTitle,
      fullName,
      phone,
      education,
      skills,
    } = body;

    if (!email || !internshipId || !internshipTitle) {
      return NextResponse.json(
        { error: 'Email, internshipId, and internshipTitle are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const profile = getStaticProfileByEmail(cleanEmail);
    if (!profile) {
      return NextResponse.json(
        { error: 'User does not exist in member roster.' },
        { status: 404 }
      );
    }

    const userId = normalizeUserId(cleanEmail);
    const appId = `app_${userId}_${internshipId}_${Date.now()}`;
    const nowIso = new Date().toISOString();

    const application: InternshipApplication = {
      id: appId,
      user_id: userId,
      internship_id: internshipId,
      internship_title: internshipTitle,
      full_name: fullName || profile.fullName || profile.username,
      email: cleanEmail,
      phone: phone || profile.phone || '',
      education: education || `${profile.degree} ${profile.branch}, ${profile.college}`,
      skills: skills || profile.careerInterest || 'Full-Stack Development',
      status: 'Interested',
      submitted_at: nowIso,
      admin_notes: '',
    };

    if (isFirebaseConfigured) {
      const docRef = doc(db, 'internship_applications', appId);
      await setDoc(docRef, application);
    }

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (err: any) {
    console.error('Internship POST error:', err);
    return NextResponse.json(
      { error: 'Failed to submit internship application.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId, status, adminNotes, adminEmail } = body;

    if (!applicationId || !adminEmail) {
      return NextResponse.json(
        { error: 'applicationId and adminEmail are required.' },
        { status: 400 }
      );
    }

    const adminProfile = getStaticProfileByEmail(String(adminEmail).trim().toLowerCase());
    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only administrators can update application status.' },
        { status: 403 }
      );
    }

    if (isFirebaseConfigured) {
      const docRef = doc(db, 'internship_applications', applicationId);
      const updates: any = {};
      if (status) updates.status = status;
      if (adminNotes !== undefined) updates.admin_notes = adminNotes;
      await updateDoc(docRef, updates);
    }

    return NextResponse.json({ success: true, applicationId, status, adminNotes });
  } catch (err: any) {
    console.error('Internship PATCH error:', err);
    return NextResponse.json(
      { error: 'Failed to update application.' },
      { status: 500 }
    );
  }
}
