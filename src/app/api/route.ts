import { NextResponse } from 'next/server';

// THIS IS A SAMPLE FILE ONLY
// PLEASE REMOVE THIS FILE AND REPLACE WITH YOUR OWN ROUTES
// PLEASE BASE YOUR ROUTES ON THE EXAMPLES IN THE README

export async function GET(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    return NextResponse.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
