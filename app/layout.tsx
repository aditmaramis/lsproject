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
	title: 'lsproject - Fast & Secure Link Shortener',
	description:
		'Shorten, track, and manage your links with ease. Create branded short links, track clicks with analytics, and share with confidence. Your all-in-one link management platform.',
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
