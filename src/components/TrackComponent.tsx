import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';
import type { MouseEvent } from 'react';
import type { Project } from '@/types/portfolio';
import TrackInfoTags from '@/components/TrackInfoTags';

interface TrackComponentProps {
	project: Project;
	onSelect?: (project: Project) => void;
	className?: string;
}

function timeline_str(project: Project) {
	const start = project.start.year;
	const end = project.end === 'present' ? 'Present' : project.end.year;
	if (start === end) return '';
	return ` • ${start} — ${end}`;
}

export default function TrackComponent({ project, onSelect, className = '' }: TrackComponentProps) {
	const stop = (event: MouseEvent) => event.stopPropagation();

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => onSelect?.(project)}
			className={`group border-line bg-card hover:bg-track flex w-full cursor-pointer items-center gap-4 rounded-[2px] border-1 p-3 text-left transition-colors ${className}`}
		>
			<img src={project.cover.src} alt={project.cover.alt} className="border-line h-16 w-16 flex-shrink-0 rounded-[2px] object-cover" draggable={false} />

			<div className="flex min-w-0 flex-1 flex-col justify-center">
				<h3 className="text-title truncate leading-tight font-semibold">
					{project.title}
					<span className="text-subtext ml-1 text-sm font-normal">{timeline_str(project)}</span>
				</h3>
				<p className="text-subtext mb-1.5 truncate text-sm leading-snug">{project.brief_description}</p>
				<TrackInfoTags skills={project.skills} size={14} gap={8} />
			</div>

			<div className="flex flex-shrink-0 items-center gap-2">
				{project.demo_url && (
					<a href={project.demo_url} target="_blank" rel="noreferrer" onClick={stop} title="Demo" aria-label="Open demo" className="text-subtext hover:text-text transition-colors">
						<ArrowSquareOut size={20} />
					</a>
				)}
				{project.github_url && (
					<a
						href={project.github_url}
						target="_blank"
						rel="noreferrer"
						onClick={stop}
						title="GitHub"
						aria-label="Open GitHub repository"
						className="text-subtext hover:text-text transition-colors"
					>
						<GithubLogo size={20} />
					</a>
				)}
			</div>
		</div>
	);
}
