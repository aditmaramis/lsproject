# Agent Instructions for lsproject

> **Purpose**: This document serves as the master guide for AI agents (LLMs) working on this project. It defines coding standards, conventions, and best practices to ensure consistency and quality across the codebase.

---

## ⚠️ CRITICAL: READ INSTRUCTION FILES FIRST

**🚨 BEFORE GENERATING ANY CODE, YOU MUST:**

1. **ALWAYS read the relevant instruction files** from the `/docs` directory
2. **NEVER skip this step** - instruction files contain essential standards and patterns
3. **Check which instruction files apply** to the code you're about to write
4. **Follow the conventions exactly** as specified in those files

**Failure to read instruction files before coding will result in inconsistent code that violates project standards.**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Instruction Files](#instruction-files)
- [General Principles](#general-principles)
- [Quick Reference](#quick-reference)

---

## Project Overview

**lsproject** is a modern Next.js application built with TypeScript, featuring:

- Server-side rendering with Next.js 16 App Router
- Type-safe database access with Drizzle ORM and Neon PostgreSQL
- Authentication via Clerk
- Responsive UI with Tailwind CSS v4
- Modern React 19 patterns

---

## Tech Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.1.4  | React framework with App Router |
| React        | 19.2.3  | UI library                      |
| TypeScript   | ^5      | Type safety                     |
| Tailwind CSS | ^4      | Styling framework               |
| Drizzle ORM  | ^0.45.1 | Database ORM                    |
| Neon         | ^1.0.2  | Serverless PostgreSQL           |
| Clerk        | ^6.36.8 | Authentication                  |
| ESLint       | ^9      | Code linting                    |

---

## Instruction Files

Detailed coding standards are organized into separate files in the `/docs` directory.

**🚨 MANDATORY: ALWAYS read the relevant instruction file BEFORE making any changes to that part of the codebase. This is NOT optional - these files define the required standards and patterns that MUST be followed.**

### Core Instructions

- **[Authentication Conventions](/docs/auth-conventions.md)** - Clerk authentication standards and patterns (READ BEFORE touching any auth code)
- **[UI Component Conventions](/docs/ui-conventions.md)** - shadcn/ui component usage and standards (READ BEFORE creating/modifying UI components)

---

## General Principles

### 1. **Type Safety First**

- Always use TypeScript's strict mode
- Avoid `any` types; use `unknown` if truly needed
- Define explicit return types for functions
- Use type inference where it improves readability

### 2. **Code Quality**

- Follow ESLint rules without exceptions
- Write self-documenting code with clear naming
- Keep functions small and focused (single responsibility)
- Prefer composition over inheritance

### 3. **File Organization**

```
/app              → Next.js App Router pages and layouts
/components       → Reusable React components
/db               → Database schema and connection
/lib              → Utility functions and helpers
/docs             → Agent instruction files
/public           → Static assets
```

### 4. **Import Conventions**

- Use `@/` path alias for root imports
- Group imports: external → internal → relative
- Sort imports alphabetically within groups

Example:

```typescript
// External packages
import { useState } from 'react';
import { clsx } from 'clsx';

// Internal modules
import { db } from '@/db';
import { cn } from '@/lib/utils';

// Relative imports
import { UserProfile } from './UserProfile';
```

### 5. **Naming Conventions**

- **Files**: kebab-case for utilities, PascalCase for components
  - `user-service.ts`, `UserProfile.tsx`
- **Components**: PascalCase
  - `UserDashboard`, `NavigationBar`
- **Functions/Variables**: camelCase
  - `fetchUserData`, `isAuthenticated`
- **Constants**: UPPER_SNAKE_CASE
  - `MAX_RETRIES`, `API_BASE_URL`
- **Types/Interfaces**: PascalCase
  - `UserProfile`, `DatabaseConfig`

### 6. **Error Handling**

- Use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately (client vs server)
- Never expose sensitive data in errors

### 7. **Performance**

- Minimize client-side JavaScript (use Server Components)
- Implement proper loading states
- Use `React.memo` judiciously
- Optimize images with Next.js Image component

### 8. **Accessibility**

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper heading hierarchy

### 9. **Next.js Routing & Middleware**

- **⚠️ NEVER use `middleware.ts`** - This is deprecated in Next.js 16+
- **ALWAYS use `proxy.ts`** for middleware-like functionality instead
- The traditional middleware.ts pattern is no longer supported in this version
- Refer to [proxy.ts](proxy.ts) for the correct implementation pattern

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit migrate  # Run migrations
npx drizzle-kit studio   # Open Drizzle Studio
```

### Path Aliases

- `@/*` → Root directory (`/`)
  - `@/app`, `@/components`, `@/lib`, `@/db`

### Environment Variables

Required environment variables:

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

---

## Working with This Project

### Before Making Changes

1. **🚨 FIRST: Read the relevant instruction file(s)** from `/docs` - THIS IS MANDATORY
2. **Verify you understand the conventions** specified in the instruction files
3. **Check existing patterns** in similar files
4. **Verify type safety** with TypeScript
5. **Test locally** before committing

**DO NOT proceed with code generation until you have read and understood the relevant instruction files.**

### When Creating New Features

1. **🚨 READ relevant instruction files from `/docs` first** (e.g., auth-conventions.md for auth features, ui-conventions.md for UI components)
2. Determine if component should be Server or Client
3. Define TypeScript types/interfaces first
4. Follow file naming conventions from instruction files
5. Add proper error handling
6. Implement loading and error states
7. Test responsiveness and accessibility

### When Modifying Existing Code

1. **🚨 READ the relevant instruction files** from `/docs` that apply to the code area you're modifying
2. Understand the current implementation
3. Maintain consistency with existing patterns AND instruction file standards
4. Update related types/interfaces
5. Check for breaking changes
6. Verify all imports still work

---

## Questions or Clarifications?

When uncertain about:

- **Architecture decisions**: Refer to existing similar components
- **TypeScript patterns**: Check `/docs/typescript-standards.md`
- **Next.js specifics**: Check `/docs/nextjs-conventions.md`
- **Database queries**: Check `/docs/database-conventions.md`
- **Styling approach**: Check `/docs/styling-conventions.md`
- **Auth flows**: Check `/docs/auth-conventions.md`

---

**Last Updated**: January 20, 2026  
**Version**: 1.0.0
