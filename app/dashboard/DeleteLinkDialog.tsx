'use client';

import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteLink } from './actions';

interface DeleteLinkDialogProps {
	linkId: number;
	linkTitle: string | null;
	children: React.ReactNode;
}

export function DeleteLinkDialog({
	linkId,
	linkTitle,
	children,
}: DeleteLinkDialogProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleDelete = async () => {
		setError('');
		setLoading(true);

		try {
			const result = await deleteLink({ id: linkId });

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
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the link &quot;
						{linkTitle || 'Untitled Link'}&quot;. This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				{error && (
					<div className="text-sm text-red-500 bg-red-50 p-3 rounded">
						{error}
					</div>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={loading}
						className="bg-red-600 hover:bg-red-700"
					>
						{loading ? 'Deleting...' : 'Delete'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
