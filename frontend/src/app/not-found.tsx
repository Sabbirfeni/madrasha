import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white dark:text-white">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="pt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-primary/70 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
