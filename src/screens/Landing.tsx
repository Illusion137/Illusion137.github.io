import type { Playlist, Project } from '@/types/portfolio';
import { get_age, get_graduation_status } from '@/utils/utils';
import Dither from '@/components/Dither';
import TrackComponent from '@/components/TrackComponent';
import PlaylistComponent from '@/components/PlaylistComponent';

function months(year: number, month: number) {
	return year * 12 + month;
}

function compare_recency(a: Project, b: Project) {
	const a_end = a.end === 'present' ? Number.POSITIVE_INFINITY : months(a.end.year, a.end.month);
	const b_end = b.end === 'present' ? Number.POSITIVE_INFINITY : months(b.end.year, b.end.month);
	if (a_end !== b_end) return b_end - a_end;
	return months(b.start.year, b.start.month) - months(a.start.year, a.start.month);
}

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
	on_select_playlist_play?: (playlist: Playlist) => void;
}

export default function LandingScreen({
	face_src,
	playlists,
	projects,
	name = 'Daniel Raygoza',
	tagline = 'Data & Fullstack Software Engineer',
	// eslint-disable-next-line no-irregular-whitespace
	about = ` I'm a ${get_age('2/5/2007')}-year-old ${get_graduation_status()} Northern Arizona University with around ${get_age('1/1/22')} years of software engineering experience through projects and clubs. My journey began in high school, in which I started working on GUI apps in C++ and mobile apps with React Native. Nearly all my projects I’ve ever done require large-scale data collection, and to satisfy this requirement, I’ve become fairly proficient in all sorts of web-scraping and reverse engineering.`,
	quote = '"If it doesn\'t exist in this world I\'ll just have to make it myself."',
	on_select_playlist,
	on_select_project,
	on_select_playlist_play,
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
						<p className="text-subtext text-xs font-medium tracking-widest uppercase">Education</p>
						<p className="text-subtext mt-5 max-w-xl">Software Engineering, Bachelor of Science &mdash; Northern Arizona University (May 2028)</p>
					</div>

					<div className="mt-10">
						<p className="text-subtext text-xs font-medium tracking-widest uppercase">Playlists</p>
						<div className="mt-4 flex gap-4 overflow-x-auto pb-2" style={{ marginRight: 'calc(-1.5rem - max((100vw - 72rem) / 2, 0px))' }}>
							{playlists.map((playlist) => (
								<PlaylistComponent key={playlist.id} playlist={playlist} on_select_playlist={on_select_playlist} on_select_playlist_play={on_select_playlist_play} />
							))}
						</div>
					</div>

					<div className="mt-10">
						<p className="text-subtext text-xs font-medium tracking-widest uppercase">Projects</p>
						<div className="mt-4 flex flex-col gap-3">
							{[...projects].sort(compare_recency).map((project) => (
								<TrackComponent key={project.id} project={project} onSelect={on_select_project} />
							))}
						</div>
						<p className="text-subtext relative top-2 mt-10 max-w-xl text-sm">
							Even more on my{' '}
							<a className="text-secondary" href="https://github.com/Illusion137">
								GitHub
							</a>{' '}
							and many smaller projects not uploaded.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
