import { skill_names, skill_registry } from '@/data/skills';
import type { Skill } from '@/types/portfolio';

interface TrackInfoTagsProps {
	skills: Skill[];
	size?: number;
	gap?: number;
	className?: string;
}

export default function TrackInfoTags({ skills, size = 18, gap = 10, className = '' }: TrackInfoTagsProps) {
	return (
		<ul className={`flex flex-wrap items-center ${className}`} style={{ gap }}>
			{skills.map((skill) => {
				const SkillIcon = skill_registry[skill];
				return (
					<li key={skill} title={skill_names[skill]} aria-label={skill_names[skill]} className="flex items-center">
						<SkillIcon size={size} />
					</li>
				);
			})}
		</ul>
	);
}
