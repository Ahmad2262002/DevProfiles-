

import About from '@/components/About'
import Hero from '@/components/Hero'
import Link from "next/link";
import React from 'react'




const developers = [
  { id: "1", name: "Ahmad", role: "Frontend Developer", bio: "Loves React & Next.js" },
  { id: "2", name: "Sara", role: "Backend Developer", bio: "Laravel & APIs expert" },
  { id: "3", name: "Omar", role: "Full Stack Developer", bio: "Flutter + Node.js" },
];

export default function HomePage() {
  return (
    <div>
     
      
      <h1>DevProfiles</h1>

      <ul>
        {developers.map((dev) => (
          <li key={dev.id}>
            <Link href={`/developers/${dev.id}`}>
              <strong>{dev.name}</strong> – {dev.role}
            </Link>
            <p>{dev.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}