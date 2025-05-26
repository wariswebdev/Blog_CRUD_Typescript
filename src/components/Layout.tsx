// src/components/Layout.tsx

// Wrapper component that adds top padding below the fixed navbar
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="pt-10">{children}</div>;
}
