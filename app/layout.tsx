import type { Metadata } from 'next';
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import { Button } from '@/components/ui/button';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'lsproject - Modern Next.js Starter',
	description:
		'Production-ready Next.js starter with authentication, database, and beautiful UI components. Built with TypeScript, Tailwind CSS, and modern best practices.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className="dark"
			>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<header className="flex justify-end items-center p-4 gap-4">
						<SignedOut>
							<SignInButton mode="modal">
								<Button variant="ghost">Sign in</Button>
							</SignInButton>
							<SignUpButton mode="modal">
								<Button>Sign up</Button>
							</SignUpButton>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
