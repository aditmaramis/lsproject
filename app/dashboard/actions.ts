'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { createLinkInDb, updateLinkInDb, deleteLinkInDb } from '@/data/links';
import { revalidatePath } from 'next/cache';

const createLinkSchema = z.object({
	shortCode: z
		.string()
		.min(3, 'Short code must be at least 3 characters')
		.max(10, 'Short code must be at most 10 characters')
		.regex(
			/^[a-zA-Z0-9-_]+$/,
			'Short code can only contain letters, numbers, hyphens, and underscores',
		),
	originalUrl: z.string().url('Please enter a valid URL'),
	title: z.string().max(255).optional(),
	description: z.string().optional(),
	expiresAt: z.date().optional(),
});

const updateLinkSchema = z.object({
	id: z.number(),
	shortCode: z
		.string()
		.min(3, 'Short code must be at least 3 characters')
		.max(10, 'Short code must be at most 10 characters')
		.regex(
			/^[a-zA-Z0-9-_]+$/,
			'Short code can only contain letters, numbers, hyphens, and underscores',
		)
		.optional(),
	originalUrl: z.string().url('Please enter a valid URL').optional(),
	title: z.string().max(255).optional(),
	description: z.string().optional(),
	isActive: z.boolean().optional(),
	expiresAt: z.date().nullable().optional(),
});

const deleteLinkSchema = z.object({
	id: z.number(),
});

interface CreateLinkParams {
	shortCode: string;
	originalUrl: string;
	title?: string;
	description?: string;
	expiresAt?: Date;
}

interface UpdateLinkParams {
	id: number;
	shortCode?: string;
	originalUrl?: string;
	title?: string;
	description?: string;
	isActive?: boolean;
	expiresAt?: Date | null;
}

interface DeleteLinkParams {
	id: number;
}

export async function createLink(params: CreateLinkParams) {
	// 1. Auth check
	const { userId } = await auth();
	if (!userId) return { error: 'Unauthorized' };

	// 2. Validate
	const validated = createLinkSchema.safeParse(params);
	if (!validated.success) {
		return { error: validated.error.issues[0].message };
	}

	// 3. Call data layer
	try {
		const result = await createLinkInDb(userId, validated.data);
		revalidatePath('/dashboard');
		return { success: true, data: result };
	} catch (error) {
		// Check for unique constraint violation
		if (
			error instanceof Error &&
			error.message.includes('duplicate key value')
		) {
			return { error: 'This short code is already taken' };
		}
		return { error: 'Failed to create link' };
	}
}

export async function updateLink(params: UpdateLinkParams) {
	// 1. Auth check
	const { userId } = await auth();
	if (!userId) return { error: 'Unauthorized' };

	// 2. Validate
	const validated = updateLinkSchema.safeParse(params);
	if (!validated.success) {
		return { error: validated.error.issues[0].message };
	}

	// 3. Call data layer
	try {
		const { id, ...updateData } = validated.data;
		const result = await updateLinkInDb(id, userId, updateData);
		revalidatePath('/dashboard');
		return { success: true, data: result };
	} catch (error) {
		// Check for unique constraint violation
		if (
			error instanceof Error &&
			error.message.includes('duplicate key value')
		) {
			return { error: 'This short code is already taken' };
		}
		return { error: 'Failed to update link' };
	}
}

export async function deleteLink(params: DeleteLinkParams) {
	// 1. Auth check
	const { userId } = await auth();
	if (!userId) return { error: 'Unauthorized' };

	// 2. Validate
	const validated = deleteLinkSchema.safeParse(params);
	if (!validated.success) {
		return { error: validated.error.issues[0].message };
	}

	// 3. Call data layer
	try {
		await deleteLinkInDb(validated.data.id, userId);
		revalidatePath('/dashboard');
		return { success: true };
	} catch {
		return { error: 'Failed to delete link' };
	}
}
