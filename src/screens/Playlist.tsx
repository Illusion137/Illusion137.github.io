import { CaretLeft, Play } from '@phosphor-icons/react';
import TrackComponent from '@/components/TrackComponent';
import { playlists, projects as all_projects } from '@/data/portfolio';
import type { Playlist, Project } from '@/types/portfolio';
import Dither from '@/components/Dither';
import { getColorSync } from 'colorthief';
import { useCallback, useMemo, useRef, useState } from 'react';

interface PlaylistScreenProps {
	playlist_id: string;
	on_back?: () => void;
	on_select_playlist_play?: (playlist: Playlist) => void;
	on_select_project?: (playlist: Playlist, project_index: number) => void;
}

export default function PlaylistScreen({ playlist_id, on_back, on_select_playlist_play, on_select_project }: PlaylistScreenProps) {
	const playlist = playlists.find((playlist) => playlist.id === playlist_id)!;
	const projects = useMemo<Project[]>(
		() => (playlist.project_ids ?? []).map((id) => all_projects.find((project) => project.id === id)).filter((project): project is Project => project !== undefined),
		[playlist.project_ids],
	);

	const cover_ref = useRef<HTMLImageElement>(null);

	const [wave_color, set_wave_color] = useState<[number, number, number]>([0.4745, 0, 0.5647]);

	const handle_cover_load = () => {
		if (!cover_ref.current) return;
		try {
			const color = getColorSync(cover_ref.current);
			const rgb = color?.array();
			if (rgb) set_wave_color([rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]);
		} catch {
			// keep the current wave color if extraction fails
		}
	};

	const on_select_track = useCallback((project: Project) => {
		const project_index = playlist.project_ids.findIndex((id) => id === project.id);
		if (project_index !== -1) on_select_project?.(playlist, project_index);
	}, []);

	return (
		<section className="mx-auto flex w-full max-w-6xl flex-col md:h-[calc(100dvh-5rem)] md:flex-row">
			<button
				type="button"
				onClick={on_back}
				aria-label="Back"
				className="border-line bg-card/70 text-title hover:bg-playing-song fixed top-4 left-4 z-[15] flex h-9 w-9 items-center justify-center rounded-[2px] border-2 backdrop-blur-sm transition-colors"
			>
				<CaretLeft size={20} weight="bold" />
			</button>

			<div className="pointer-events-none absolute inset-0 z-0 opacity-80">
				<Dither waveColor={wave_color} waveSpeed={0.05} waveFrequency={0.05} waveAmplitude={1} colorNum={10} pixelSize={3} enableMouseInteraction={false} disableAnimation={false} />
			</div>

			<div className="via-background/60 to-background from-background/10 pointer-events-auto absolute inset-0 z-[1] bg-gradient-to-r" />

			<aside className="z-10 flex shrink-0 flex-col items-center gap-4 px-6 pt-12 text-center md:w-96 md:items-start md:overflow-hidden md:text-left">
				<img
					ref={cover_ref}
					src={playlist.cover.src}
					alt={playlist.cover.alt}
					className="border-line bg-card h-48 w-48 rounded-[2px] border-2 object-cover"
					draggable={false}
					onLoad={handle_cover_load}
				/>
				<div className="min-w-0">
					<p className="text-subtext text-xs font-medium tracking-widest uppercase">Playlist</p>
					<h1 className="text-title mt-1 text-4xl font-bold">{playlist.title}</h1>
					<p className="text-subtext mt-2">{playlist.description}</p>
					<p className="text-deeptext mt-3 text-sm">{projects.length} projects</p>
					<button
						type="button"
						onClick={() => on_select_playlist_play?.(playlist)}
						className="border-line bg-primary text-text hover:bg-highlight-press mx-auto mt-5 flex w-fit items-center gap-2 rounded-[2px] border-2 px-5 py-2 font-semibold transition-colors md:mx-0"
					>
						<Play size={18} weight="fill" />
						Play
					</button>
				</div>
			</aside>

			<div className="z-10 flex flex-1 flex-col gap-3 px-6 pt-6 pb-28 md:overflow-y-auto md:pt-12">
				{projects.map((project) => (
					<TrackComponent key={project.id} project={project} onSelect={on_select_track} />
				))}
			</div>
		</section>
	);
}
