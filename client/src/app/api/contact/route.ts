import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Proxy GET and POST requests to the server-side API
export async function GET() {
    try {
        const apiUrl = `${process.env.SERVER_API_URL || 'http://localhost:3001'}/ai/api/contact`;
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const apiUrl = `${process.env.SERVER_API_URL || 'http://localhost:3001'}/ai/api/contact`;
        const body = await request.json();
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
