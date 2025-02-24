interface ILayoutProps {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayoutProps) {
  return <> {children}</>;
}
