# Authentication Conventions

> **Purpose**: This document defines authentication standards and patterns for this project.

## Authentication Provider

**Clerk** is the **ONLY** authentication provider used in this application.

- ❌ **DO NOT** implement custom auth logic
- ❌ **DO NOT** use any other auth libraries (NextAuth, Auth0, etc.)
- ✅ **ALWAYS** use Clerk's provided components and hooks

---

## Protected Routes

### Dashboard Route

The `/dashboard` page is a protected route:

```typescript
// Use Clerk's auth protection
import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect('/');
	}

	// Dashboard content...
}
```

**Alternative**: Use Clerk's middleware for route protection (recommended):

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) await auth.protect();
});
```

---

## Homepage Redirect Logic

**Authenticated users accessing the homepage should be redirected to `/dashboard`:**

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
	const { userId } = await auth();

	if (userId) {
		redirect('/dashboard');
	}

	// Public homepage content...
}
```

---

## Sign In / Sign Out Modals

**ALL sign-in and sign-out actions must launch as modals, not full-page redirects.**

### Implementation

Use Clerk's modal components:

```typescript
'use client';

import { SignInButton, SignOutButton } from '@clerk/nextjs';

// Sign In Button
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Sign Out Button
<SignOutButton>
  <button>Sign Out</button>
</SignOutButton>
```

### Configuration

Ensure `CLERK_SIGN_IN_FORCE_REDIRECT_URL` and `CLERK_SIGN_UP_FORCE_REDIRECT_URL` are **NOT** set if you want modal behavior by default.

---

## Common Clerk Hooks & Components

### Client Components

```typescript
'use client';

import {
  useUser,        // Get current user data
  useAuth,        // Get auth state and helpers
  UserButton,     // Pre-built user menu
  SignInButton,   // Sign in trigger
  SignOutButton,  // Sign out trigger
} from '@clerk/nextjs';

function MyComponent() {
  const { user, isLoaded } = useUser();
  const { userId, sessionId } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;

  return <div>Hello {user.firstName}</div>;
}
```

### Server Components

```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function ServerComponent() {
  // Option 1: Get userId and sessionId
  const { userId } = await auth();

  // Option 2: Get full user object
  const user = await currentUser();

  return <div>User ID: {userId}</div>;
}
```

---

## Environment Variables

Required Clerk environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional (for modal behavior, leave unset or set to /dashboard)
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

---

## Best Practices

1. **Use Server Components** when possible for auth checks (better performance)
2. **Check `isLoaded`** in client components before rendering auth-dependent UI
3. **Use UserButton** component for user profile/sign out UI (consistent UX)
4. **Protect API routes** with Clerk's auth middleware
5. **Never store sensitive data** client-side based on auth state alone

---

## API Route Protection

```typescript
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	// Protected logic...
	return NextResponse.json({ data: 'Protected data' });
}
```

---

## Summary Checklist

- ✅ Use Clerk exclusively for all auth
- ✅ Protect `/dashboard` route
- ✅ Redirect authenticated users from homepage to `/dashboard`
- ✅ Use modal mode for sign in/sign out
- ✅ Use appropriate Clerk hooks/components for client vs server
- ✅ Protect API routes with auth checks

---

**Last Updated**: January 20, 2026  
**Version**: 1.0.0
