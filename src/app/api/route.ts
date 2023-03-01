import { NextResponse } from 'next/server';

// THIS IS A SAMPLE FILE ONLY
// PLEASE REMOVE THIS FILE AND REPLACE WITH YOUR OWN ROUTES
// PLEASE BASE YOUR ROUTES ON THE EXAMPLES IN THE README

export async function GET(req: Request) {
  try {
    return NextResponse.json({ message: 'Hello World' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return NextResponse.json({ message: 'Hello World' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    return NextResponse.json({ message: 'Hello World' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    return NextResponse.json({ message: 'Hello World' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
