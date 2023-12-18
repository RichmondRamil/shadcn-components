// DEPENDENCIES
import { Input } from '@shadcn/components/ui/input';
import { Button } from '@shadcn/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@shadcn/components/ui/card';
import { Separator } from '@shadcn/components/ui/separator';

import { Link } from 'react-router-dom';
// COMPONENTS
import Footer from '../../shared/components/common/Footer';
import ThemeToggleMode from '@/shared/components/common/ThemeToggleMode';

const packages = [
	{
		name: 'React',
		link: 'https://reactjs.org/',
		description: 'A JavaScript library for building user interfaces',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
	},
	{
		name: 'Tailwindcss',
		link: 'https://tailwindcss.com/',
		description:
			'A utility-first CSS framework for rapidly building custom designs.',
		logo: 'https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png',
	},
	// SHADCN
	{
		name: 'Shadcn',
		link: 'https://ui.shadcn.com/',
		description: 'A React UI component library built with Tailwind CSS.',
		logo: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
	},
	{
		name: 'React Router Dom',
		link: 'https://reactrouter.com/web/guides/quick-start',
		description: 'Declarative routing for React',
		logo: 'https://seeklogo.com/images/R/react-router-logo-AB5BFB638F-seeklogo.com.png',
	},
	{
		name: 'Zustand',
		link: 'https://zustand.surge.sh/',
		description:
			'A small, fast and scalable bearbones state-management solution.',
		logo: 'https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560',
	},
];

export default function Home() {
	return (
		<>
			<div className="flex flex-row justify-between mx-5 my-2 h-1/2">
				<nav className="flex flex-row space-x-3">
					<Button variant="ghost" size="default" className="text-primary">
						<Link to="/">Altus Digital</Link>
					</Button>

					<Button variant="ghost" size="default">
						<Link to="/overview">Overview</Link>
					</Button>
					<Button variant="ghost" size="default">
						<Link to="/dashboard">Dashboard</Link>
					</Button>
				</nav>
				<div className="flex flex-row space-x-5">
					<Input placeholder="Search..." />
					<Button variant="outline" size="default">
						<Link to="/signup">Signup</Link>
					</Button>
					<ThemeToggleMode />
				</div>
			</div>

			<Separator />

			<div className="flex flex-row justify-center items-center m-5">
				{packages.map((item, index) => (
					<Card key={index} className="w-1/5 m-2 h-60">
						<CardHeader>
							<img
								src={item.logo}
								alt={item.name}
								className="w-10 h-10 rounded-full"
							/>
						</CardHeader>
						<CardContent>
							<CardTitle>{item.name}</CardTitle>
							<CardDescription>{item.description}</CardDescription>
						</CardContent>
						<CardFooter>
							<Button variant="outline" size="sm">
								<a href={item.link} target="_blank" rel="noreferrer">
									Go to website
								</a>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="absolute  w-full bottom-0">
				<Footer />
			</div>
		</>
	);
}
