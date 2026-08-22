import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { success: false, error: 'Username query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              username
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username: username.trim() },
      }),
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `LeetCode API responded with status ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const matchedUser = data?.data?.matchedUser;

    if (!matchedUser) {
      return NextResponse.json(
        { success: false, error: `LeetCode user '${username}' not found` },
        { status: 404 }
      );
    }

    const acSubmissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const allItem = acSubmissions.find((item: any) => item.difficulty === 'All');
    const easyItem = acSubmissions.find((item: any) => item.difficulty === 'Easy');
    const mediumItem = acSubmissions.find((item: any) => item.difficulty === 'Medium');
    const hardItem = acSubmissions.find((item: any) => item.difficulty === 'Hard');

    const totalSolved = allItem?.count || 0;
    const easySolved = easyItem?.count || 0;
    const mediumSolved = mediumItem?.count || 0;
    const hardSolved = hardItem?.count || 0;

    return NextResponse.json({
      success: true,
      username: matchedUser.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error querying LeetCode API:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch LeetCode statistics' },
      { status: 500 }
    );
  }
}
