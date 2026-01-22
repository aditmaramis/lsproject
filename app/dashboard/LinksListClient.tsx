'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { EditLinkDialog } from './EditLinkDialog';
import { DeleteLinkDialog } from './DeleteLinkDialog';

type Link = {
	id: number;
	shortCode: string;
	originalUrl: string;
	title: string | null;
	description: string | null;
	clickCount: number;
	isActive: boolean;
	createdAt: Date;
	expiresAt: Date | null;
	userId: string;
};

type SortOption =
	| 'title-asc'
	| 'title-desc'
	| 'date-newest'
	| 'date-oldest'
	| 'clicks-high'
	| 'clicks-low'
	| 'active'
	| 'inactive';

interface LinksListClientProps {
	links: Link[];
}

export function LinksListClient({ links }: LinksListClientProps) {
	const [sortBy, setSortBy] = useState<SortOption>('date-newest');

	const sortedLinks = [...links].sort((a, b) => {
		switch (sortBy) {
			case 'title-asc':
				return (a.title || 'Untitled Link').localeCompare(
					b.title || 'Untitled Link',
				);
			case 'title-desc':
				return (b.title || 'Untitled Link').localeCompare(
					a.title || 'Untitled Link',
				);
			case 'date-newest':
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			case 'date-oldest':
				return (
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			case 'clicks-high':
				return b.clickCount - a.clickCount;
			case 'clicks-low':
				return a.clickCount - b.clickCount;
			case 'active':
				return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
			case 'inactive':
				return a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1;
			default:
				return 0;
		}
	});

	if (links.length === 0) {
		return (
			<Card>
				<CardContent className="pt-6">
					<p className="text-muted-foreground text-center">
						No links yet. Create your first link to get started!
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<label
					htmlFor="sort-select"
					className="text-sm font-medium"
				>
					Sort by:
				</label>
				<Select
					value={sortBy}
					onValueChange={(value) => setSortBy(value as SortOption)}
				>
					<SelectTrigger
						id="sort-select"
						className="w-50"
					>
						<SelectValue placeholder="Sort by..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="title-asc">Title (A-Z)</SelectItem>
						<SelectItem value="title-desc">Title (Z-A)</SelectItem>
						<SelectItem value="date-newest">Newest First</SelectItem>
						<SelectItem value="date-oldest">Oldest First</SelectItem>
						<SelectItem value="clicks-high">Most Clicks</SelectItem>
						<SelectItem value="clicks-low">Least Clicks</SelectItem>
						<SelectItem value="active">Active First</SelectItem>
						<SelectItem value="inactive">Inactive First</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{sortedLinks.map((link) => (
				<Card key={link.id}>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>{link.title || 'Untitled Link'}</span>
							<span
								className={`text-sm ${link.isActive ? 'text-green-600' : 'text-gray-400'}`}
							>
								{link.isActive ? 'Active' : 'Inactive'}
							</span>
						</CardTitle>
						{link.description && (
							<CardDescription>{link.description}</CardDescription>
						)}
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Short URL:
								</span>
								<code className="text-sm bg-muted px-2 py-1 rounded">
									/{link.shortCode}
								</code>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Original URL:
								</span>
								<a
									href={link.originalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-blue-600 hover:underline truncate max-w-xs"
								>
									{link.originalUrl}
								</a>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Clicks:</span>
								<span className="text-sm font-medium">{link.clickCount}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Created:</span>
								<span className="text-sm">
									{new Date(link.createdAt).toLocaleDateString()}
								</span>
							</div>
							{link.expiresAt && (
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Expires:
									</span>
									<span className="text-sm">
										{new Date(link.expiresAt).toLocaleDateString()}
									</span>
								</div>
							)}
						</div>
						<div className="flex gap-2 mt-4">
							<EditLinkDialog link={link}>
								<Button
									variant="outline"
									size="sm"
								>
									Edit
								</Button>
							</EditLinkDialog>
							<DeleteLinkDialog
								linkId={link.id}
								linkTitle={link.title}
							>
								<Button
									variant="outline"
									size="sm"
									className="text-red-600 hover:text-red-700 hover:bg-red-50"
								>
									Delete
								</Button>
							</DeleteLinkDialog>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
