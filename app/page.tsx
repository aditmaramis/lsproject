import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
	ArrowRight,
	Database,
	Lock,
	Zap,
	Sparkles,
	Shield,
	Code2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function Home() {
	// Check if user is authenticated and redirect to dashboard
	try {
		const { userId } = await auth();
		if (userId) {
			redirect('/dashboard');
		}
	} catch (error) {
		// If Clerk is not configured, continue to show the landing page
		// This allows the page to render even without Clerk credentials
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
			{/* Hero Section */}
			<section className="container mx-auto px-4 pt-20 pb-16 sm:pt-32 sm:pb-24">
				<div className="mx-auto max-w-4xl text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-zinc-200/50 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100">
						<Sparkles className="size-4" />
						<span>Built with Next.js 16 & React 19</span>
					</div>
					<h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
						Build Modern Web Apps{' '}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Faster
						</span>
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
						A production-ready Next.js starter with authentication, database, and
						beautiful UI components. Start building your next project in minutes,
						not days.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<SignUpButton mode="modal">
							<Button size="lg" className="gap-2">
								Get Started
								<ArrowRight className="size-4" />
							</Button>
						</SignUpButton>
						<SignInButton mode="modal">
							<Button size="lg" variant="outline">
								Sign In
							</Button>
						</SignInButton>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-16 sm:py-24">
				<div className="mx-auto max-w-5xl">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
							Everything you need to ship fast
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
							Built with modern technologies and best practices, so you can focus
							on building your product.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
									<Lock className="size-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle>Secure Authentication</CardTitle>
								<CardDescription>
									Production-ready auth with Clerk. Sign in with email, social providers, or magic links.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
									<Database className="size-6 text-purple-600 dark:text-purple-400" />
								</div>
								<CardTitle>Type-Safe Database</CardTitle>
								<CardDescription>
									Drizzle ORM with Neon PostgreSQL. Fully typed queries and automatic migrations.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
									<Zap className="size-6 text-green-600 dark:text-green-400" />
								</div>
								<CardTitle>Lightning Fast</CardTitle>
								<CardDescription>
									Built on Next.js 16 App Router with React Server Components for optimal performance.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950">
									<Code2 className="size-6 text-orange-600 dark:text-orange-400" />
								</div>
								<CardTitle>Beautiful UI</CardTitle>
								<CardDescription>
									Shadcn/ui components with Tailwind CSS v4. Fully customizable and accessible.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-950">
									<Shield className="size-6 text-pink-600 dark:text-pink-400" />
								</div>
								<CardTitle>TypeScript First</CardTitle>
								<CardDescription>
									Full type safety across your entire stack. Catch errors before they reach production.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-zinc-200 dark:border-zinc-800">
							<CardHeader>
								<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950">
									<Sparkles className="size-6 text-cyan-600 dark:text-cyan-400" />
								</div>
								<CardTitle>Developer Experience</CardTitle>
								<CardDescription>
									Hot reload, TypeScript, ESLint, and modern tooling for the best DX possible.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16 sm:py-24">
				<div className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
					<h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
						Ready to build something amazing?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
						Join developers who are already building production apps with this
						stack.
					</p>
					<SignUpButton mode="modal">
						<Button size="lg" className="gap-2">
							Start Building Now
							<ArrowRight className="size-4" />
						</Button>
					</SignUpButton>
				</div>
			</section>
		</div>
	);
}
