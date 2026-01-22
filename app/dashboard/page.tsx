import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/links';
import { CreateLinkDialog } from './CreateLinkDialog';
import { LinksListClient } from './LinksListClient';

export default async function DashboardPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect('/');
	}

	const userLinks = await getUserLinks(userId);

	return (
		<div className="container mx-auto py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<CreateLinkDialog />
			</div>

			<LinksListClient links={userLinks} />
		</div>
	);
}
