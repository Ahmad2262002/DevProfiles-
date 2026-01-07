import React from "react";
import Link from "next/link";
import { getDevelopers } from "@/lib/api";

export default async function ServerSideFetching() {
    const developers = await getDevelopers();

    return (
        <section className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-5xl font-black text-gradient tracking-tight">Meet the Experts</h1>
                <p className="text-lg text-muted-foreground font-medium">
                    Discover top-tier talent from our global network of developers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {developers.map((dev) => (
                    <div
                        key={dev.id}
                        className="group relative glass-card rounded-xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                        <div className="relative z-10 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {dev.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                                        {dev.role}
                                    </p>
                                </div>
                                <span className="p-2 bg-primary/5 rounded-lg text-primary text-xs font-bold">
                                    ID: {dev.id}
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {dev.bio}
                            </p>

                            <div className="pt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {dev.email}
                                </span>
                                <Link
                                    href={`/developers/${dev.id}`}
                                    className="text-xs font-bold text-primary flex items-center gap-1 group/btn"
                                >
                                    View Profile
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}