import Link from "next/link";

const developers = [
  { id: "1", name: "Ahmad", role: "Frontend Developer", bio: "Loves React & Next.js" },
  { id: "2", name: "Sara", role: "Backend Developer", bio: "Laravel & APIs expert" },
  { id: "3", name: "Omar", role: "Full Stack Developer", bio: "Flutter + Node.js" },
];

export default function DeveloperPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const developer = developers.find((dev) => dev.id === id);

  if (!developer) {
    return <h3>Developer not found</h3>;
  }

  return (
    <div>
      <h3>{developer.name}</h3>
      <p><strong>Role:</strong> {developer.role}</p>
      <p>{developer.bio}</p>

      <Link href={`/developers/${id}/projects`}>
        View Projects →
      </Link>
    </div>
  );
}
export async function generateStaticParams() {
  return developers.map((dev) => ({ id: dev.id }));
}