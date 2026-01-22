'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateLink } from './actions';

type Link = {
	id: number;
	shortCode: string;
	originalUrl: string;
	title: string | null;
	description: string | null;
	isActive: boolean;
};

interface EditLinkDialogProps {
	link: Link;
	children: React.ReactNode;
}

export function EditLinkDialog({ link, children }: EditLinkDialogProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		shortCode: link.shortCode,
		originalUrl: link.originalUrl,
		title: link.title || '',
		description: link.description || '',
		isActive: link.isActive,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const result = await updateLink({
				id: link.id,
				...formData,
			});

			if (result.error) {
				setError(result.error);
			} else {
				// Success - close dialog
				setOpen(false);
			}
		} catch {
			setError('An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-131.25">
				<DialogHeader>
					<DialogTitle>Edit Link</DialogTitle>
					<DialogDescription>
						Update your shortened link details.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label htmlFor="originalUrl">
							Original URL <span className="text-red-500">*</span>
						</Label>
						<Input
							id="originalUrl"
							type="url"
							placeholder="https://example.com/very-long-url"
							value={formData.originalUrl}
							onChange={(e) =>
								setFormData({ ...formData, originalUrl: e.target.value })
							}
							required
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="shortCode">
							Short Code <span className="text-red-500">*</span>
						</Label>
						<Input
							id="shortCode"
							type="text"
							placeholder="my-link"
							value={formData.shortCode}
							onChange={(e) =>
								setFormData({ ...formData, shortCode: e.target.value })
							}
							required
							disabled={loading}
							minLength={3}
							maxLength={10}
							pattern="[a-zA-Z0-9-_]+"
						/>
						<p className="text-xs text-muted-foreground">
							3-10 characters, letters, numbers, hyphens, and underscores only
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="title">Title (Optional)</Label>
						<Input
							id="title"
							type="text"
							placeholder="Link title"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							disabled={loading}
							maxLength={255}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description (Optional)</Label>
						<Textarea
							id="description"
							placeholder="Add a description..."
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							disabled={loading}
							rows={3}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="isActive">Status</Label>
						<div className="flex items-center gap-2">
							<input
								id="isActive"
								type="checkbox"
								checked={formData.isActive}
								onChange={(e) =>
									setFormData({ ...formData, isActive: e.target.checked })
								}
								disabled={loading}
								className="h-4 w-4"
							/>
							<span className="text-sm text-muted-foreground">
								Link is active
							</span>
						</div>
					</div>

					{error && (
						<div className="text-sm text-red-500 bg-red-50 p-3 rounded">
							{error}
						</div>
					)}

					<div className="flex justify-end gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading}
						>
							{loading ? 'Updating...' : 'Update Link'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
