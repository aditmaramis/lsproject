import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function getUserLinks(userId: string) {
	return await db
		.select()
		.from(links)
		.where(eq(links.userId, userId))
		.orderBy(desc(links.createdAt));
}

export async function createLinkInDb(
	userId: string,
	data: {
		shortCode: string;
		originalUrl: string;
		title?: string;
		description?: string;
		expiresAt?: Date;
	},
) {
	const [link] = await db
		.insert(links)
		.values({
			userId,
			shortCode: data.shortCode,
			originalUrl: data.originalUrl,
			title: data.title,
			description: data.description,
			expiresAt: data.expiresAt,
		})
		.returning();

	return link;
}

export async function updateLinkInDb(
	linkId: number,
	userId: string,
	data: {
		shortCode?: string;
		originalUrl?: string;
		title?: string;
		description?: string;
		isActive?: boolean;
		expiresAt?: Date | null;
	},
) {
	const [link] = await db
		.update(links)
		.set({
			...data,
			updatedAt: new Date(),
		})
		.where(eq(links.id, linkId))
		.returning();

	return link;
}

export async function deleteLinkInDb(linkId: number, userId: string) {
	await db.delete(links).where(eq(links.id, linkId));
}

export async function getLinkByShortCode(shortCode: string) {
	const [link] = await db
		.select()
		.from(links)
		.where(eq(links.shortCode, shortCode));

	return link;
}

export async function incrementClickCount(linkId: number) {
	await db
		.update(links)
		.set({
			clickCount: sql`${links.clickCount} + 1`,
		})
		.where(eq(links.id, linkId));
}
