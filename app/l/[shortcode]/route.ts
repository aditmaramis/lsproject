import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode, incrementClickCount } from '@/data/links';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ shortcode: string }> },
) {
	try {
		const { shortcode } = await params;

		// Fetch the link from the database
		const link = await getLinkByShortCode(shortcode);

		// Handle link not found
		if (!link) {
			return NextResponse.json({ error: 'Link not found' }, { status: 404 });
		}

		// Check if link is active
		if (!link.isActive) {
			return NextResponse.json({ error: 'Link is inactive' }, { status: 410 });
		}

		// Check if link has expired
		if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
			return NextResponse.json({ error: 'Link has expired' }, { status: 410 });
		}

		// Increment click count asynchronously (don't wait for it)
		incrementClickCount(link.id).catch((error) => {
			console.error('Failed to increment click count:', error);
		});

		// Redirect to the original URL
		return NextResponse.redirect(link.originalUrl, 301);
	} catch (error) {
		console.error('Error in redirect handler:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
