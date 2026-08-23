import type { Icon } from '@phosphor-icons/react';

export type ProjectRole = 'self' | 'contribution';

export type Skill =
	| 'typescript'
	| 'react'
	| 'nodejs'
	| 'react_native'
	| 'discordjs'
	| 'cpp'
	| 'wasm'
	| 'tauri'
	| 'nextjs'
	| 'expo'
	| 'java'
	| 'supabase'
	| 'sentry';

export interface MonthYear {
	year: number;
	month: number;
}

export type ProjectEnd = MonthYear | 'present';

export interface ShowcaseItem {
	src: string;
	alt: string;
}

export interface Project {
	id: string;
	title: string;
	role_title: string;
	brief_description: string;
	info: string;
	role: ProjectRole;
	start: MonthYear;
	end: ProjectEnd;
	cover: ShowcaseItem;
	skills: Skill[];
	showcase: ShowcaseItem[];
	demo_url?: string;
	github_url?: string;
}

export interface Playlist {
	id: string;
	title: string;
	description: string;
	cover: ShowcaseItem;
	project_ids: string[];
}

export interface SocialLink {
	name: string;
	url: string;
	icon: Icon;
}
