//CSS
import './globals.css';
// COMPONENTS
import AppWrapper from './appWrapper';
interface RootLayoutProps {
  children: React.ReactNode;
}
export const metadata = {
  title: 'Altus Digital',
  description: 'Salesforce partner',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    apple: '/favicon/apple-touch-icon.png',
    icon: [
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/favicon/manifest.json',
  category: 'technology',
  verification: {
    google: 'google',
  },
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{props.children}</AppWrapper>
      </body>
    </html>
  );
}
