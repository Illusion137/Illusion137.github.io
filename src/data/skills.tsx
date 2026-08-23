import type { FC } from 'react';
import type { IconType } from 'react-icons';
import { SiCplusplus, SiDiscord, SiExpo, SiJavascript, SiNextdotjs, SiNodedotjs, SiReact, SiSentry, SiSupabase, SiTauri, SiTypescript, SiWebassembly } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import type { Skill } from '@/types/portfolio';

export interface SkillIconProps {
	size?: number;
	className?: string;
}

export type SkillComponent = FC<SkillIconProps>;

interface SkillMeta {
	name: string;
	color: string;
	icon: IconType;
}

const skill_meta: Record<Skill, SkillMeta> = {
	typescript: { name: 'TypeScript', color: '#3178C6', icon: SiTypescript },
	react: { name: 'React', color: '#61DAFB', icon: SiReact },
	nodejs: { name: 'Node.js', color: '#5FA04E', icon: SiNodedotjs },
	react_native: { name: 'React Native', color: '#61DAFB', icon: SiReact },
	discordjs: { name: 'discord.js', color: '#5865F2', icon: SiDiscord },
	cpp: { name: 'C++', color: '#00599C', icon: SiCplusplus },
	wasm: { name: 'WebAssembly', color: '#654FF0', icon: SiWebassembly },
	tauri: { name: 'Tauri', color: '#24C8DB', icon: SiTauri },
	nextjs: { name: 'Next.js', color: '#FFFFFF', icon: SiNextdotjs },
	expo: { name: 'Expo', color: '#FFFFFF', icon: SiExpo },
	java: { name: 'Java', color: '#E76F00', icon: FaJava },
	supabase: { name: 'Supabase', color: '#3FCF8E', icon: SiSupabase },
	sentry: { name: 'Sentry', color: '#8D5494', icon: SiSentry },
	javascript: { name: 'JavaScript', color: '#F0DB4F', icon: SiJavascript },
};

function make_skill_component(meta: SkillMeta): SkillComponent {
	return function SkillIcon({ size = 20, className }: SkillIconProps) {
		const IconComponent = meta.icon;
		return <IconComponent size={size} color={meta.color} title={meta.name} className={className} />;
	};
}

export const skill_registry = Object.fromEntries(Object.entries(skill_meta).map(([key, meta]) => [key, make_skill_component(meta)])) as Record<Skill, SkillComponent>;

export const skill_names = Object.fromEntries(Object.entries(skill_meta).map(([key, meta]) => [key, meta.name])) as Record<Skill, string>;
