import { NextApiRequest, NextApiResponse } from 'next';

// THIS IS A SAMPLE FILE ONLY
// PLEASE REMOVE THIS FILE AND REPLACE WITH YOUR OWN ROUTES
// PLEASE BASE YOUR ROUTES ON THE EXAMPLES IN THE README

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return res.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return res.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON
    return res.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body; // Parse the request body as JSON

    return res.json({ message: 'Hello World' }); // Return a JSON response
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
