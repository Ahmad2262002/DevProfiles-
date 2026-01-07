import Link from "next/link";
import Hero from './Hero';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-black text-gradient tracking-tighter hover:opacity-80 transition-opacity">
          DevProfiles
        </Link>
        <nav className="flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/developers" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Developers
          </Link>
          <Link
            href="/join"
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
          >
            Join Network
          </Link>
        </nav>
      </div>
    </header>
  );
}

