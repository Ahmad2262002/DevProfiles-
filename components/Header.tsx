import Link from "next/link";
import Hero from './Hero';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
        <nav className="space-x-4">
          <Link href="/hero" className="text-gray-600 hover:text-gray-900">
            <Hero/>
          </Link>
          
          
          
        </nav>
      </div>
    </header>
  );
}

