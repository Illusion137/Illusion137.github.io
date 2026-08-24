import { SkipBack, SkipForward } from '@phosphor-icons/react';
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
	on_toggle?: () => void;
	is_player_open?: boolean;
}

function format_years(project: Project) {
	const start_year = project.start.year;
	const end_year = project.end === 'present' ? 'Present' : project.end.year;
	return start_year === end_year && project.end !== 'present' ? `${start_year}` : `${start_year} – ${end_year}`;
}

function format_role(project: Project) {
	return project.role === 'self' ? 'Self' : project.role === 'group' ? 'Group' : 'Contribution';
}

export default function BottomBar({ project, viewed, total, progress, socials, on_previous, on_next, on_toggle, is_player_open }: BottomBarProps) {
	const stop = (event: { stopPropagation: () => void }) => event.stopPropagation();

	return (
		<div className="z-30 w-full">
			<ProgressBar value={total === 0 ? 0 : progress} />
			<footer
				onClick={on_toggle}
				className={`border-line grid h-20 w-full grid-cols-3 items-center px-5 transition-colors duration-500 ease-out max-sm:pr-2 ${is_player_open ? 'bg-play-screen/50' : 'bg-play-screen'} ${project ? 'cursor-pointer' : ''}`}
			>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={(event) => {
							stop(event);
							on_previous?.();
						}}
						aria-label="Previous"
						className="text-subtext hover:text-text transition-colors"
					>
						<SkipBack size={24} weight="fill" />
					</button>
					<button
						type="button"
						onClick={(event) => {
							stop(event);
							on_next?.();
						}}
						aria-label="Next"
						className="text-subtext hover:text-text transition-colors"
					>
						<SkipForward size={24} weight="fill" />
					</button>
					<span className="text-subtext ml-1 font-mono text-sm tabular-nums">
						{viewed}/{total}
					</span>
				</div>

				<div className="flex min-w-0 flex-col items-center justify-center text-center max-sm:hidden">
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

				<div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noreferrer"
							onClick={stop}
							title={social.name}
							aria-label={social.name}
							className="text-subtext hover:text-text transition-colors"
						>
							<social.icon size={22} />
						</a>
					))}
				</div>
			</footer>
		</div>
	);
}
