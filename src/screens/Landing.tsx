import type { Playlist, Project } from '@/types/portfolio';
import { get_age, get_graduation_status } from '@/utils/utils';
import Dither from '@/components/Dither';
import TrackComponent from '@/components/TrackComponent';

interface LandingScreenProps {
	face_src: string;
	playlists: Playlist[];
	projects: Project[];
	name?: string;
	tagline?: string;
	about?: string;
	quote?: string;
	on_select_playlist?: (playlist: Playlist) => void;
	on_select_project?: (project: Project) => void;
}

export default function LandingScreen({
	face_src,
	playlists,
	projects,
	name = 'Daniel Raygoza',
	tagline = 'Fullstack Software Engineer',
	// eslint-disable-next-line no-irregular-whitespace
	about = ` I'm a ${get_age('2/5/2007')}-year-old ${get_graduation_status()} Northern Arizona University with around ${get_age('1/1/22')} years of software engineering experience through projects and clubs. My main journey began in high school, in which I started working on GUI apps in C++ and mobile apps with React Native. Nearly all my projects I’ve ever done require large-scale data collection, and to satisfy this requirement, I’ve become fairly proficient in all sorts of web-scraping and reverse engineering.`,
	quote = '"If it doesn\'t exist in this world I\'ll just have to make it myself."',
	on_select_playlist,
	on_select_project,
}: LandingScreenProps) {
	return (
		<div className="relative w-full overflow-x-clip">
			<div className="pointer-events-none absolute inset-0 z-0 opacity-80">
				<Dither waveColor={[0.4745, 0, 0.5647]} waveSpeed={0.05} waveFrequency={0.01} waveAmplitude={0.4} colorNum={4} pixelSize={2} enableMouseInteraction={false} disableAnimation={false} />
			</div>

			<div className="via-background/80 to-background from-background/30 pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r" />

			<section className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col md:flex-row">
				<aside className="flex shrink-0 flex-col items-center px-6 pt-12 md:sticky md:top-0 md:h-[calc(100dvh-5rem)] md:w-[42%] md:items-start md:justify-center md:self-start md:pt-0">
					<img src={face_src} alt={name} className="border-line bg-card h-72 w-72 rounded-[2px] object-cover md:h-96 md:w-96" draggable={false} />
				</aside>

				<div className="flex min-w-0 flex-1 flex-col px-6 pt-10 pb-28 text-left md:pt-16">
					<p className="text-subtext text-sm font-medium tracking-widest uppercase">{name}</p>
					<h1 className="text-title mt-3 text-4xl leading-tight font-bold md:text-5xl">{tagline}</h1>
					<p className="text-subtext mt-5 max-w-xl">{about}</p>
					<blockquote className="text-[rgb(108, 117, 125)] mt-5 max-w-xl invert-40">-- {quote}</blockquote>

					<div className="mt-10">
						<p className="text-subtext text-xs font-medium tracking-widest uppercase">Playlists</p>
						<div className="mt-4 flex gap-4 overflow-x-auto pb-2" style={{ marginRight: 'calc(-1.5rem - max((100vw - 72rem) / 2, 0px))' }}>
							{playlists.map((playlist) => (
								<button
									key={playlist.id}
									type="button"
									onClick={() => on_select_playlist?.(playlist)}
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

					<div className="mt-10">
						<p className="text-subtext text-xs font-medium tracking-widest uppercase">Projects</p>
						<div className="mt-4 flex flex-col gap-3">
							{projects.map((project) => (
								<TrackComponent key={project.id} project={project} onSelect={on_select_project} />
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
