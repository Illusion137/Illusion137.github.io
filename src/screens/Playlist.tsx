import TrackComponent from '@/components/TrackComponent';
import type { Playlist, Project } from '@/types/portfolio';

interface PlaylistScreenProps {
	playlist: Playlist;
	projects: Project[];
	onSelectProject?: (project: Project) => void;
}

export default function PlaylistScreen({ playlist, projects, onSelectProject }: PlaylistScreenProps) {
	return (
		<section className="mx-auto flex w-full max-w-6xl flex-col md:h-[calc(100dvh-5rem)] md:flex-row">
			<aside className="flex shrink-0 flex-col items-center gap-4 px-6 pt-12 text-center md:w-96 md:items-start md:overflow-hidden md:text-left">
				<img src={playlist.cover.src} alt={playlist.cover.alt} className="border-line bg-card h-48 w-48 flex-shrink-0 rounded-[2px] border-2 object-cover" draggable={false} />
				<div className="min-w-0">
					<p className="text-subtext text-xs font-medium tracking-widest uppercase">Playlist</p>
					<h1 className="text-title mt-1 text-4xl font-bold">{playlist.title}</h1>
					<p className="text-subtext mt-2">{playlist.description}</p>
					<p className="text-deeptext mt-3 text-sm">{projects.length} projects</p>
				</div>
			</aside>

			<div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-28 md:overflow-y-auto md:pt-12">
				{projects.map((project) => (
					<TrackComponent key={project.id} project={project} onSelect={onSelectProject} />
				))}
			</div>
		</section>
	);
}
