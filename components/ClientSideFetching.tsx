'use client';

import React, { useEffect, useState } from "react";

interface ClientSideFetchingProps {
  developerId: string;
}

const ClientSideFetching = ({ developerId }: ClientSideFetchingProps) => {
  const [projects, setProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock data fetching based on ID
        const mockProjects = [
          `Project A for Dev ${developerId}`,
          `Project B for Dev ${developerId}`,
          `Project C for Dev ${developerId}`,
        ];

        setProjects(mockProjects);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    if (developerId) {
      fetchProjects();
    }
  }, [developerId]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-3xl font-black text-gradient tracking-tight">Developer Projects</h3>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-extrabold rounded-full uppercase tracking-widest">
          Client-Side Fetch
        </span>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-full glass-card rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-destructive animate-ping" />
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex items-center gap-6 p-6 glass-card rounded-xl transition-all hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:shadow-lg hover:border-primary/20"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="flex-grow">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Project Identifier</span>
                <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-muted-foreground italic">In development</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="text-center py-20 glass-card rounded-2xl">
          <p className="text-muted-foreground font-medium italic">No projects discovered for this developer yet.</p>
        </div>
      )}
    </div>
  );
};

export default ClientSideFetching;
