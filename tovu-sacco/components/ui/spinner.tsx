export function Spinner({ className = "h-6 w-6 text-gray-500" }: { className?: string }) {
    return (
      <div className={`animate-spin rounded-full border-4 border-current border-t-transparent ${className}`} role="status" />
    );
  }
  