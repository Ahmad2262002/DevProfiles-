import { getProjects } from "@/lib/data";

type Props = {
  params: { id: string };
};

export default async function ProjectsPage({ params }: Props) {
  const { id } = await params;

  const projects = getProjects(id);

  if (!projects.length) {
    return <p>No projects found for this developer.</p>;
  }

  return (
    <div>
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
