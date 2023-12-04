import {
	FaGlobeAsia,
	FaTwitterSquare,
	FaLinkedin,
	FaMedium,
} from 'react-icons/fa';
import Logo from '../../../shared/assets/img/sf-partner-logo.png';
import { Separator } from '@shadcn/components/ui/separator';

const icons = [
	{
		icon: <FaGlobeAsia size={22} />,
		link: 'https://altus.digital',
	},
	{
		icon: <FaLinkedin size={24} />,
		link: 'https://www.linkedin.com/company/altusdigital',
	},
	{
		icon: <FaTwitterSquare size={24} />,
		link: 'https://twitter.com/altus_digital',
	},
	{
		icon: <FaMedium size={24} />,
		link: 'https://altusdigital.medium.com/',
	},
];
export default function Footer() {
	return (
		<footer className="w-full">
			<div className="grid place-items-center bg-base-300 pt-5">
				<div className="flex flex-col items-center justify-center  gap-5 rounded-xl">
					<div className=" flex gap-2 items-center justify-center">
						<img src={Logo} alt="Altus Digital logo" className="h-12" />
						{icons.map((icon, index) => (
							<span className="hover:bg-[#8248e5] p-2 rounded-full" key={index}>
								<a href={icon.link} target="_blank" rel="noreferrer">
									{icon.icon}
								</a>
							</span>
						))}
					</div>
					<Separator />
					<div className="py-[1.05rem] mx-20 md:mx-0 text-center">
						<h3 className="font-semibold">
							Copyright &#169; {new Date().getFullYear()} • Altus Digital Pty
							Ltd (ABN 94 638 335 716) • All Rights Reserved
						</h3>
					</div>
				</div>
			</div>
		</footer>
	);
}
