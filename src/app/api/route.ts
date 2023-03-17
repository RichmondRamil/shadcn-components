import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// THIS IS A SAMPLE FILE ONLY
// PLEASE REMOVE THIS FILE AND REPLACE WITH YOUR OWN ROUTES
// PLEASE BASE YOUR ROUTES ON THE EXAMPLES IN THE README

export async function GET(req: NextApiRequest) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
