import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Proxy GET, PUT, DELETE requests to the server-side API
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const apiUrl = `${process.env.SERVER_API_URL || 'http://localhost:3001'}/ai/api/blog/${id}`;
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const apiUrl = `${process.env.SERVER_API_URL || 'http://localhost:3001'}/ai/api/blog/${id}`;
        const body = await request.json();
        const res = await fetch(apiUrl, {
            method: 'PUT',
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const apiUrl = `${process.env.SERVER_API_URL || 'http://localhost:3001'}/ai/api/blog/${id}`;
        const res = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
