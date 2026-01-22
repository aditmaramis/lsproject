---
description: Read this file before implementing server actions or data mutations in this project.
applyTo: '**'
---

# Server Actions & Data Mutations

> **Purpose**: Defines the required patterns for handling data mutations using Next.js Server Actions.

---

## Core Rules

**🚨 ALL data mutations MUST be done via Server Actions**

---

## File Structure

### Naming & Location

- Server action files **MUST** be named `actions.ts`
- **MUST** be co-located with the component calling them

```
/app/dashboard/
  ├── page.tsx       # Client component
  └── actions.ts     # Server actions
```

---

## Implementation Requirements

### 1. Type Safety

- **NEVER use `FormData` TypeScript type**
- Define explicit interfaces for all parameters

```typescript
// ✅ Correct
interface CreateLinkParams {
  url: string;
  slug: string;
}

export async function createLink(params: CreateLinkParams) { ... }

// ❌ Wrong
export async function createLink(formData: FormData) { ... }
```

### 2. Validation with Zod

- **ALL** input data **MUST** be validated using Zod

```typescript
import { z } from 'zod';

const createLinkSchema = z.object({
	url: z.string().url(),
	slug: z.string().min(3).max(50),
});

export async function createLink(params: CreateLinkParams) {
	const validated = createLinkSchema.safeParse(params);
	if (!validated.success) {
		return { error: 'Invalid input' };
	}
	// Continue...
}
```

### 3. Authentication Check

- **MUST** verify user authentication **BEFORE** any database operations

```typescript
import { auth } from '@clerk/nextjs/server';

export async function createLink(params: CreateLinkParams) {
	const { userId } = await auth();
	if (!userId) {
		return { error: 'Unauthorized' };
	}
	// Continue...
}
```

### 4. Database Operations

- **NEVER** use Drizzle queries directly in server actions
- **MUST** use helper functions from `/data` directory

```typescript
// ✅ Correct - Use data layer helpers
import { createLinkInDb } from '@/data/links';

export async function createLink(params: CreateLinkParams) {
  // auth & validation...
  const link = await createLinkInDb(userId, validated.data);
  return { success: true, link };
}

// ❌ Wrong - Direct Drizzle usage
import { db } from '@/db';
export async function createLink(params: CreateLinkParams) {
  const link = await db.insert(links).values({ ... }); // FORBIDDEN
}
```

### 5. Error Handling

- Server actions **MUST NOT throw errors**
- **ALWAYS** return an object with `error` or `success` property
- Never use try-catch to throw errors up to the client

```typescript
// ✅ Correct - Return error object
export async function createLink(params: CreateLinkParams) {
	try {
		const result = await createLinkInDb(userId, validated.data);
		return { success: true, data: result };
	} catch (error) {
		return { error: 'Failed to create link' };
	}
}

// ❌ Wrong - Throwing errors
export async function createLink(params: CreateLinkParams) {
	const result = await createLinkInDb(userId, validated.data);
	return result; // Could throw unhandled error
}
```

### 6. Client Component Integration

- Server actions **MUST** be called from Client Components only
- Use `'use client'` directive

```typescript
// page.tsx
'use client';

import { createLink } from './actions';

export default function Dashboard() {
	const handleSubmit = async (data: CreateLinkParams) => {
		const result = await createLink(data);
		// Handle result...
	};
}
```

---

## Complete Template

```typescript
// actions.ts
'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { dataLayerFunction } from '@/data/your-file';

const actionSchema = z.object({
	field: z.string(),
});

interface ActionParams {
	field: string;
}

export async function yourAction(params: ActionParams) {
	// 1. Auth check
	const { userId } = await auth();
	if (!userId) return { error: 'Unauthorized' };

	// 2. Validate
	const validated = actionSchema.safeParse(params);
	if (!validated.success) return { error: 'Invalid input' };

	// 3. Call data layer
	try {
		const result = await dataLayerFunction(userId, validated.data);
		return { success: true, data: result };
	} catch (error) {
		return { error: 'Action failed' };
	}
}
```

---

## Checklist

- [ ] File named `actions.ts` and co-located
- [ ] `'use server'` directive at top
- [ ] Proper TypeScript types (no FormData)
- [ ] Zod validation implemented
- [ ] Auth check first
- [ ] Uses `/data` helpers only
- [ ] Called from client component

---

**Last Updated**: January 22, 2026
