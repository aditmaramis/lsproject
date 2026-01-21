import {
	pgTable,
	integer,
	varchar,
	text,
	timestamp,
	boolean,
	index,
} from 'drizzle-orm/pg-core';

export const links = pgTable(
	'links',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
		userId: varchar('user_id', { length: 255 }).notNull(),
		originalUrl: text('original_url').notNull(),
		title: varchar('title', { length: 255 }),
		description: text('description'),
		clickCount: integer('click_count').default(0).notNull(),
		isActive: boolean('is_active').default(true).notNull(),
		expiresAt: timestamp('expires_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
		createdAtIdx: index('created_at_idx').on(table.createdAt),
	}),
);
