import { NextResponse } from 'next/server';
import { fetchGitHubIssues } from '@/lib/github';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const per_page = Number(searchParams.get('per_page')) || 12;
  const language = searchParams.get('language') || '';

  try {
    const data = await fetchGitHubIssues(page, per_page, language);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' }, 
      { status: 500 }
    );
  }
} 