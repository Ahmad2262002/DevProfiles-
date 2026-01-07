import { getDeveloper } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function DeveloperPage({ params }: Props) {
  const { id } = await params;
  const developer = await getDeveloper(id);

  if (!developer) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="relative glass-card rounded-2xl p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative z-10 space-y-8 text-center sm:text-left">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-widest mb-4">
              Profile Details
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-gradient tracking-tight">
              {developer.name}
            </h1>
            <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">
              {developer.role}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs font-black text-primary uppercase tracking-widest">Contact Email</span>
              <p className="text-lg font-medium">{developer.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-primary uppercase tracking-widest">Network ID</span>
              <p className="text-lg font-medium">#{developer.id}</p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-black text-primary uppercase tracking-widest">Professional Bio</span>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "{developer.bio}"
            </p>
          </div>

          <div className="pt-10">
            <Link
              href={`/developers/${id}/projects`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-base font-black rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group"
            >
              Explore Portfolio Projects
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Network
        </Link>
      </div>
    </div>
  );
}
