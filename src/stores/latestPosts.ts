import { create } from 'zustand'

type postStore = {
    posts: {
        href: string;
        title: string;
        featureImage: string | null;
    }[],
    setPosts: (posts: {
        href: string;
        title: string;
        featureImage: string | null;
    }[]) => void
}

export const useLatestPostStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts: posts })
}));