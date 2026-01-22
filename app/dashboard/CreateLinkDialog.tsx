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
import { createLink } from './actions';

export function CreateLinkDialog() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		shortCode: '',
		originalUrl: '',
		title: '',
		description: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const result = await createLink(formData);

			if (result.error) {
				setError(result.error);
			} else {
				// Success - close dialog and reset form
				setOpen(false);
				setFormData({
					shortCode: '',
					originalUrl: '',
					title: '',
					description: '',
				});
				// Refresh the page to show new link
				window.location.reload();
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
			<DialogTrigger asChild>
				<Button>Create New Link</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-131.25">
				<DialogHeader>
					<DialogTitle>Create New Short Link</DialogTitle>
					<DialogDescription>
						Create a new shortened link to share with others.
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
							{loading ? 'Creating...' : 'Create Link'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
