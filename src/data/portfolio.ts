import {
	GithubLogo,
	InstagramLogo,
	LinkedinLogo,
} from '@phosphor-icons/react';
import type { Playlist, Project, SocialLink } from '@/types/portfolio';

export const projects: Project[] = [
	{
		id: 'placeholder-education',
		title: 'Placeholder Degree',
		brief_description: 'A very brief one-liner about this education entry.',
		info: '## Placeholder Degree\n\nA longer **markdown** write-up: coursework, focus areas, and highlights.\n\n- point one\n- point two',
		role: 'self',
		start: { year: 2021, month: 9 },
		end: 'present',
		cover: { src: '', alt: 'Placeholder Degree cover' },
		skills: ['java', 'cpp'],
		showcase: [],
	},
	{
		id: 'placeholder-project',
		title: 'Placeholder Project',
		brief_description: 'A very brief one-liner about what this project is.',
		info: '## Placeholder Project\n\nWhat problem it solves, the approach taken, and the outcome.',
		role: 'self',
		start: { year: 2024, month: 3 },
		end: 'present',
		cover: { src: '', alt: 'Placeholder Project cover' },
		skills: ['typescript', 'react', 'nextjs', 'supabase'],
		showcase: [],
		demo_url: 'https://example.com',
		github_url: 'https://github.com/Illusion137',
	},
	{
		id: 'placeholder-contribution',
		title: 'Placeholder Contribution',
		brief_description: 'A short description of an open-source contribution.',
		info: '## Placeholder Contribution\n\nDetails about what was contributed and the impact.',
		role: 'contribution',
		start: { year: 2023, month: 1 },
		end: { year: 2023, month: 9 },
		cover: { src: '', alt: 'Placeholder Contribution cover' },
		skills: ['nodejs', 'discordjs'],
		showcase: [],
		github_url: 'https://github.com/Illusion137',
	},
	{
		id: 'placeholder-little',
		title: 'Placeholder Little Project',
		brief_description: 'A tiny weekend build.',
		info: '## Placeholder Little Project\n\nA small experiment thrown together for fun.',
		role: 'self',
		start: { year: 2022, month: 6 },
		end: { year: 2022, month: 7 },
		cover: { src: '', alt: 'Placeholder Little Project cover' },
		skills: ['tauri', 'wasm'],
		showcase: [],
		github_url: 'https://github.com/Illusion137',
	},
];

export const playlists: Playlist[] = [
	{
		id: 'education',
		title: 'Education',
		description: 'Schooling, coursework, and formal learning.',
		cover: { src: '', alt: 'Education playlist cover' },
		project_ids: ['placeholder-education'],
	},
	{
		id: 'projects',
		title: 'Projects',
		description: 'Larger, self-driven work.',
		cover: { src: '', alt: 'Projects playlist cover' },
		project_ids: ['placeholder-project'],
	},
	{
		id: 'contributions',
		title: 'Contributions',
		description: 'Open-source and collaborative work.',
		cover: { src: '', alt: 'Contributions playlist cover' },
		project_ids: ['placeholder-contribution'],
	},
	{
		id: 'little-projects',
		title: 'Little Projects',
		description: 'Small experiments and weekend builds.',
		cover: { src: '', alt: 'Little Projects playlist cover' },
		project_ids: ['placeholder-little'],
	},
];

export const socials: SocialLink[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/Illusion137',
		icon: GithubLogo,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/daniel-raygoza-sumi/',
		icon: LinkedinLogo,
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/_sumi137/',
		icon: InstagramLogo,
	},
];
