---
description: Read this file before implementing UI components in this project.
---

# UI Component Conventions

> **Purpose**: This document defines the standards for building UI components using shadcn/ui in this project.

---

## Overview

All UI components in this application **MUST** use [shadcn/ui](https://ui.shadcn.com/) components. Custom component creation is prohibited unless absolutely necessary and approved.

---

## Core Principles

### 1. **Use shadcn/ui Components Exclusively**

- **ALWAYS** use shadcn/ui components for all UI elements
- **DO NOT** create custom components that duplicate shadcn functionality
- If a component doesn't exist in shadcn, check their component library first

### 2. **Component Installation**

Install components using the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 3. **Component Composition**

Build complex UIs by **composing** shadcn components:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function UserForm() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>User Information</CardTitle>
			</CardHeader>
			<CardContent>
				<Input placeholder="Enter name" />
				<Button>Submit</Button>
			</CardContent>
		</Card>
	);
}
```

### 4. **Customization Guidelines**

When you need to customize a shadcn component:

- Use the `className` prop with Tailwind classes
- Leverage shadcn's built-in variants when available
- Modify the component file in `/components/ui/` if needed
- Document any significant modifications

Example:

```tsx
<Button
	className="bg-gradient-to-r from-blue-500 to-purple-500"
	variant="default"
>
	Custom Styled Button
</Button>
```

---

## Common Components

### Buttons

```tsx
import { Button } from "@/components/ui/button";

// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Forms

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

<div>
	<Label htmlFor="email">Email</Label>
	<Input
		id="email"
		type="email"
		placeholder="you@example.com"
	/>
</div>;
```

### Cards

```tsx
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

<Card>
	<CardHeader>
		<CardTitle>Card Title</CardTitle>
		<CardDescription>Card description goes here</CardDescription>
	</CardHeader>
	<CardContent>
		<p>Card content</p>
	</CardContent>
	<CardFooter>
		<Button>Action</Button>
	</CardFooter>
</Card>;
```

### Dialogs/Modals

```tsx
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';

<Dialog>
	<DialogTrigger asChild>
		<Button>Open Dialog</Button>
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Dialog Title</DialogTitle>
			<DialogDescription>Dialog description</DialogDescription>
		</DialogHeader>
		{/* Dialog content */}
	</DialogContent>
</Dialog>;
```

---

## File Organization

```
/components
  /ui              → shadcn components (managed by CLI)
    button.tsx
    card.tsx
    input.tsx
    ...
  /[feature]       → Feature-specific compositions
    UserDashboard.tsx
    ProfileCard.tsx
```

---

## When Custom Components Are Needed

In rare cases where shadcn doesn't provide a component:

1. **First**: Check if you can compose existing shadcn components
2. **Second**: Search the shadcn community components
3. **Last Resort**: Create a custom component following these rules:
   - Place in `/components/[feature]/` directory
   - Use shadcn primitives and Tailwind styling
   - Document why a custom component was necessary
   - Follow shadcn's naming and structure patterns

---

## Styling Rules

- Use Tailwind CSS v4 for all styling
- Follow shadcn's utility-first approach
- Use the `cn()` utility from `@/lib/utils` for conditional classes

```tsx
import { cn } from '@/lib/utils';

<div
	className={cn(
		'base-classes',
		isActive && 'active-classes',
		variant === 'large' && 'large-classes',
	)}
>
	Content
</div>;
```

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components/accordion)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: January 20, 2026  
**Version**: 1.0.0
