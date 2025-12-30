export type Developer = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export type Project = {
  id: string;
  devId: string;
  name: string;
  description: string;
};

export const developers: Developer[] = [
  { id: "1", name: "Ahmad", role: "Frontend Developer", bio: "Loves React & Next.js" },
  { id: "2", name: "Sara", role: "Backend Developer", bio: "Laravel & APIs expert" },
  { id: "3", name: "Omar", role: "Full Stack Developer", bio: "Flutter + Node.js" },
];

export const projects: Project[] = [
  { id: "1", devId: "1", name: "Project A", description: "A cool Next.js app" },
  { id: "2", devId: "1", name: "Project B", description: "Another cool Next.js app" },
  { id: "3", devId: "2", name: "Project C", description: "A Laravel API" },
  { id: "4", devId: "3", name: "Project D", description: "A Flutter app" },
];

export const getDeveloper = (id: string): Developer | undefined => {
  return developers.find((dev) => dev.id === id);
};

export const getProjects = (devId: string): Project[] => {
  return projects.filter((project) => project.devId === devId);
};
