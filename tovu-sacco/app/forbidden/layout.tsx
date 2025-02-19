export default function ForbiddenLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {children}
      </main>
    );
  }
  