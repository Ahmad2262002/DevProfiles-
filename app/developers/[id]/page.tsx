import { getDeveloper, developers } from "@/lib/data";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function DeveloperPage({ params }: Props) {
  
  const { id } = await params; 
  const developer = getDeveloper(id);

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

export function generateStaticParams() {
  return developers.map((dev) => ({ id: dev.id }));
}
