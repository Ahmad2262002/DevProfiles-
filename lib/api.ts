
export type Developer = {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string; 
    bio: string; 
}

export type Album = {
    userId: number;
    id: number;
    title: string;
};

// fetching all developers 
export async function getDevelopers(): Promise<Developer[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/albums?_limit=20");

    if (!res.ok) {
        throw new Error("Failed to fetch developers");
    }

    const albums: Album[] = await res.json();

    // Mapping albums to a "Developer" structure
    return albums.map((album) => ({
        id: album.id,
        name: album.title.substring(0, 20), // Using album title as name
        username: `dev_${album.id}`,
        email: `dev${album.id}@example.com`,
        role: album.id % 2 === 0 ? "Backend Developer" : "Frontend Developer",
        bio: `Passionate developer working on project ${album.title}`,
    }));
}

// fetching single developer by ID
export async function getDeveloper(id: string): Promise<Developer | null> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch developer");
    }

    const album: Album = await res.json();

    return {
        id: album.id,
        name: album.title.substring(0, 20),
        username: `dev_${album.id}`,
        email: `dev${album.id}@example.com`,
        role: album.id % 2 === 0 ? "Backend Developer" : "Frontend Developer",
        bio: `Passionate developer working on project ${album.title}`,
    };
}
