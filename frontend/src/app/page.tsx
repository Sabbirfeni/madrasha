import MadrasaLogo from '~/public/images/habrul ummah model madrasa logo.svg';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
      <div className="flex justify-center">
        <Image
          src={MadrasaLogo}
          alt="Habrul Ummah Model Madrasa Logo"
          width={600}
          height={240}
          className="h-48 w-auto sm:h-56 object-contain"
          priority
        />
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
        Habrul Ummah Model Madrasa
      </h1>

      <Link href="/dashboard">
        <Button
          size="lg"
          className="cursor-pointer text-primary-foreground font-semibold px-8 py-3 dark:text-white"
        >
          Go to Dashboard
        </Button>
      </Link>
    </main>
  );
}
