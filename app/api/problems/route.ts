import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configure Airtable with Personal Access Token
Airtable.configure({
  apiKey: process.env.AIRTABLE_PAT,
  endpointUrl: 'https://api.airtable.com',
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

interface AirtableRecord {
  id: string;
  fields: {
    Department?: string;
    'Problem Statement'?: string;
    Status?: string;
    Year?: number;
    'Github URL'?: string;
    'Deployment URL'?: string;
    Type?: string;
    Published?: boolean;
  };
}

interface Project {
  id: string;
  department: string;
  problemStatement: string;
  status: string;
  year: number;
  githubUrl?: string;
  deploymentUrl?: string;
  type: string;
  isPublished: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const per_page = Number(searchParams.get('per_page')) || 12;

  try {
    const records = await base('CFP Projects')
      .select({
        maxRecords: per_page,
        pageSize: per_page,
        view: "Grid view",
        filterByFormula: '{Published} = 1' // Only get published projects
      })
      .firstPage() as unknown as AirtableRecord[];

    const projects = records.map(record => ({
      id: record.id,
      department: record.fields['Department'] || '',
      problemStatement: record.fields['Problem Statement'] || '',
      status: record.fields['Status'] || '',
      year: record.fields['Year'] || new Date().getFullYear(),
      githubUrl: record.fields['Github URL'],
      deploymentUrl: record.fields['Deployment URL'],
      type: record.fields['Type'] || '',
      isPublished: record.fields['Published'] || false
    }));

    return NextResponse.json({
      items: projects,
      total_count: projects.length,
    });
  } catch (error) {
    console.error('Airtable Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' }, 
      { status: 500 }
    );
  }
} 