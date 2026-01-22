import initialDevs from './devs.json';

export interface Developer {
    id: number;
    name: string;
    role: string;
    bio: string;
}

// Single source of truth for the in-memory developers list
export let developers: Developer[] = [...initialDevs];
