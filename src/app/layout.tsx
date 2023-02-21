//CSS
import './globals.css';
// COMPONENTS
import AppWrapper from './appWrapper';
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AppWrapper>{props.children}</AppWrapper>
      </body>
    </html>
  );
}
