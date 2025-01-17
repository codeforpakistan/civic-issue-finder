import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';

export async function GET() {
  try {
    const data = await fetchGitHubStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' }, 
      { status: 500 }
    );
  }
} 