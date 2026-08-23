import type { Playlist } from '@/types/portfolio';

interface LandingScreenProps {
	face_src: string;
	playlists: Playlist[];
	name?: string;
	tagline?: string;
	about?: string;
	onSelectPlaylist?: (playlist: Playlist) => void;
}

export default function LandingScreen({
	face_src,
	playlists,
	name = 'Daniel Raygoza Sumi',
	tagline = 'Software developer building fast, playful, well-crafted things.',
	about = 'A short bit about me goes here; what I like to build, the kinds of problems I enjoy, and what I am currently working on.',
	onSelectPlaylist,
}: LandingScreenProps) {
	return (
		<section className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row md:gap-14">
			<div className="shrink-0">
				<img src={face_src} alt={name} className="border-line bg-card h-72 w-72 rounded-[2px] border-2 object-cover md:h-96 md:w-96" draggable={false} />
			</div>

			<div className="flex min-w-0 flex-1 flex-col text-center md:text-left">
				<p className="text-subtext text-sm font-medium tracking-widest uppercase">{name}</p>
				<h1 className="text-title mt-3 text-4xl leading-tight font-bold md:text-5xl">{tagline}</h1>
				<p className="text-subtext mt-5 max-w-xl">{about}</p>

				<div className="mt-10">
					<p className="text-subtext text-xs font-medium tracking-widest uppercase">Playlists</p>
					<div className="mt-4 flex gap-4 overflow-x-auto pb-2">
						{playlists.map((playlist) => (
							<button
								key={playlist.id}
								type="button"
								onClick={() => onSelectPlaylist?.(playlist)}
								className="group border-line bg-card hover:bg-playing-song flex w-40 shrink-0 flex-col gap-2 rounded-[2px] border-2 p-3 text-left transition-colors"
							>
								<img
									src={playlist.cover.src}
									alt={playlist.cover.alt}
									className="border-line bg-background aspect-square w-full rounded-[2px] border-2 object-cover"
									draggable={false}
								/>
								<div className="min-w-0">
									<p className="text-title truncate font-semibold">{playlist.title}</p>
									<p className="text-subtext truncate text-xs">{playlist.description}</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
