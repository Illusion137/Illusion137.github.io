import { Info, SkipBack, SkipForward } from '@phosphor-icons/react';
import type { Project, SocialLink } from '@/types/portfolio';
import ProgressBar from '@/components/ProgressBar';

interface BottomBarProps {
	project?: Project;
	viewed: number;
	total: number;
	progress: number;
	socials: SocialLink[];
	on_previous?: () => void;
	on_next?: () => void;
	on_more_info?: () => void;
}

function format_years(project: Project) {
	const start_year = project.start.year;
	const end_year = project.end === 'present' ? 'Present' : project.end.year;
	return start_year === end_year && project.end !== 'present' ? `${start_year}` : `${start_year} – ${end_year}`;
}

function format_role(project: Project) {
	return project.role === 'self' ? 'Self' : 'Contribution';
}

export default function BottomBar({ project, viewed, total, progress, socials, on_previous, on_next, on_more_info }: BottomBarProps) {
	return (
		<div className="z-30 w-full">
			<ProgressBar value={progress} />
			<footer className="border-line bg-play-screen grid h-20 w-full grid-cols-3 items-center px-5">
				<div className="flex items-center gap-3">
					<button type="button" onClick={on_previous} aria-label="Previous" className="text-subtext hover:text-text transition-colors">
						<SkipBack size={24} weight="fill" />
					</button>
					<button type="button" onClick={on_next} aria-label="Next" className="text-subtext hover:text-text transition-colors">
						<SkipForward size={24} weight="fill" />
					</button>
					<span className="text-subtext ml-1 font-mono text-sm tabular-nums">
						{viewed}/{total}
					</span>
				</div>

				<div className="flex min-w-0 flex-col items-center justify-center text-center">
					{project ? (
						<>
							<span className="text-title max-w-full truncate font-semibold">{project.title}</span>
							<span className="text-subtext text-xs">
								{format_role(project)} · {format_years(project)}
							</span>
						</>
					) : (
						<span className="text-deeptext text-sm">Nothing selected</span>
					)}
				</div>

				<div className="flex items-center justify-end gap-3">
					<button type="button" onClick={on_more_info} aria-label="More info" className="text-subtext hover:text-text transition-colors">
						<Info size={22} />
					</button>
					<span className="bg-line mx-1 h-6 w-px" aria-hidden />
					{socials.map((social) => (
						<a key={social.name} href={social.url} target="_blank" rel="noreferrer" title={social.name} aria-label={social.name} className="text-subtext hover:text-text transition-colors">
							<social.icon size={22} />
						</a>
					))}
				</div>
			</footer>
		</div>
	);
}
