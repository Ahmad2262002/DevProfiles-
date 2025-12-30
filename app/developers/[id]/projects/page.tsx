export default function ProjectsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h3>Projects</h3>
      <p>This page shows projects for developer with ID: {id}</p>
    </div>
  );
}
