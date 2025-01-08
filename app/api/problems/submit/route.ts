import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
  endpointUrl: 'https://api.airtable.com',
}).base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { department, problemStatement, type, year } = body;
    console.log('Destructured values:', { department, problemStatement, type, year });

    // Validate required fields
    if (!department || !problemStatement) {  // Remove type from validation
      console.log('Validation failed:', { department, problemStatement });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating Airtable record with fields:', {
      Deparment: department,
      'Problem Statement': problemStatement,
      Year: year,
      Status: 'Open',
      Published: false
    });

    const record = await base('tblYQwPul2tR1eoNc').create([{
      fields: {
        Deparment: department,
        'Problem Statement': problemStatement,
        Year: year || new Date().getFullYear(),
        Published: false,
      }
    }]);

    console.log('Airtable response:', record);

    return NextResponse.json({
      success: true,
      id: record[0].id,
    });
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      body: error.body,
      status: error.status
    });
    return NextResponse.json(
      { error: 'Failed to submit problem statement' },
      { status: 500 }
    );
  }
} 