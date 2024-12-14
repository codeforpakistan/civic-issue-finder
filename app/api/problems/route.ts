import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configure Airtable with Personal Access Token
const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
  endpointUrl: 'https://api.airtable.com',
}).base(process.env.AIRTABLE_BASE_ID!);



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const per_page = Number(searchParams.get('per_page')) || 12;
  const search = searchParams.get('search') || '';

  try {
    // Get all records for total count
    const allRecords = await base('tblYQwPul2tR1eoNc').select({
      view: "viwj79HJQOAmFJJAk",
      filterByFormula: search 
        ? `AND(SEARCH("${search.toLowerCase()}", LOWER({Problem Statement})), {Published})` 
        : '{Published}',
    }).all();

    const total_count = allRecords.length;
    
    // Get the slice of records for current page
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const pageRecords = allRecords.slice(startIndex, endIndex);

    const projects = pageRecords.map(record => ({
      id: record.id,
      department: record.get('Department') || '',
      problemStatement: record.get('Problem Statement') || '',
      status: record.get('Status') || '',
      year: record.get('Year') || new Date().getFullYear(),
      githubUrl: record.get('Github URL'),
      deploymentUrl: record.get('Deployment URL'),
      type: record.get('Type') || '',
      isPublished: record.get('Published') || false
    }));

    return NextResponse.json({
      items: projects,
      total_count: total_count,
      page: page,
      per_page: per_page,
      total_pages: Math.ceil(total_count / per_page)
    });
  } catch (error: any) {
    console.error('Airtable Error Details:', {
      error: error.error,
      message: error.message,
      statusCode: error.statusCode,
      config: {
        baseId: process.env.AIRTABLE_BASE_ID,
        hasToken: !!process.env.AIRTABLE_PAT,
      }
    });
    return NextResponse.json(
      { error: `Failed to fetch projects: ${error.message}` }, 
      { status: 500 }
    );
  }
} 