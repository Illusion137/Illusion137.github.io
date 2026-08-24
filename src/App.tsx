import BottomBar from '@/components/BottomBar';
import LandingScreen from '@/screens/Landing';
import { playlists, projects, socials } from '@/data/portfolio';
import PlaylistScreen from './screens/Playlist';
import AudioplayerScreen from './screens/Audioplayer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Playlist, Project } from './types/portfolio';

function synthetic_playlist(project: Project): Playlist {
	return { id: project.id, cover: project.cover, title: project.title, description: '', project_ids: [project.id] };
}

function resolve_from_search(search: string): {
	playlist_screen_id: string | null;
	active_playlist: Playlist | null;
	active_track_index: number;
	is_player_open: boolean;
} {
	const params = new URLSearchParams(search);
	const playlist_screen_id = params.get('playlist');
	const queue_id = params.get('queue');
	const track = Number.parseInt(params.get('track') ?? '0', 10) || 0;
	let active_playlist: Playlist | null = null;
	let active_track_index = 0;
	if (queue_id) {
		const real = playlists.find((candidate) => candidate.id === queue_id);
		if (real) {
			active_playlist = real;
			const count = projects.filter((candidate) => real.project_ids.includes(candidate.id)).length;
			active_track_index = Math.min(Math.max(0, track), Math.max(0, count - 1));
		} else {
			const project = projects.find((candidate) => candidate.id === queue_id);
			if (project) active_playlist = synthetic_playlist(project);
		}
	}
	const is_player_open = active_playlist !== null && params.get('s') === '1';
	return { playlist_screen_id, active_playlist, active_track_index, is_player_open };
}

function build_path(playlist_screen_id: string | null, active_playlist: Playlist | null, active_track_index: number, is_player_open: boolean): string {
	const params = new URLSearchParams();
	if (playlist_screen_id) params.set('playlist', playlist_screen_id);
	if (active_playlist) {
		params.set('queue', active_playlist.id);
		if (active_track_index > 0) params.set('track', String(active_track_index));
		if (is_player_open) params.set('s', '1');
	}
	const query = params.toString();
	return query ? `${window.location.pathname}?${query}` : window.location.pathname;
}

function App() {
	const [initial_location] = useState(() => resolve_from_search(window.location.search));
	const [active_playlist, set_active_playlist] = useState<Playlist | null>(initial_location.active_playlist);
	const playlist_projects = useMemo<Project[]>(
		() =>
			(active_playlist?.project_ids ?? [])
				.map((id) => projects.find((project) => project.id === id))
				.filter((project): project is Project => project !== undefined),
		[active_playlist],
	);
	const [active_track_index, set_active_track_index] = useState<number>(initial_location.active_track_index);

	const [playlist_screen_id, set_playlist_screen_id] = useState<string | null>(initial_location.playlist_screen_id);

	const [is_player_open, set_is_player_open] = useState<boolean>(initial_location.is_player_open);

	const handle_bottom_bar_previous = useCallback(() => {
		set_active_track_index(Math.max(0, active_track_index - 1));
	}, [active_track_index]);
	const handle_bottom_bar_next = useCallback(() => {
		set_active_track_index(Math.min(playlist_projects.length - 1, active_track_index + 1));
	}, [active_track_index, playlist_projects.length]);

	const on_select_playlist = useCallback((playlist: Playlist) => {
		set_playlist_screen_id(playlist.id);
	}, []);
	const on_select_playlist_play = useCallback((playlist: Playlist) => {
		set_active_track_index(0);
		set_active_playlist(playlist);
		set_is_player_open(true);
	}, []);
	const on_select_playlist_project_play = useCallback((playlist: Playlist, project_index: number) => {
		set_active_track_index(project_index);
		set_active_playlist(playlist);
		set_is_player_open(true);
	}, []);
	const on_select_project = useCallback((project: Project) => {
		const playlist: Playlist = {
			id: project.id,
			cover: project.cover,
			title: project.title,
			description: '',
			project_ids: [project.id],
		};
		set_active_track_index(0);
		set_active_playlist(playlist);
		set_is_player_open(true);
	}, []);

	const on_back = useCallback(() => {
		set_playlist_screen_id(null);
	}, []);

	const on_toggle_player = useCallback(() => {
		if (active_playlist) set_is_player_open((open) => !open);
	}, [active_playlist]);

	useEffect(() => {
		const next_path = build_path(playlist_screen_id, active_playlist, active_track_index, is_player_open);
		const current_path = window.location.pathname + window.location.search;
		if (next_path !== current_path) window.history.pushState(null, '', next_path);
	}, [playlist_screen_id, active_playlist, active_track_index, is_player_open]);

	useEffect(() => {
		const handle_pop = () => {
			const next = resolve_from_search(window.location.search);
			set_playlist_screen_id(next.playlist_screen_id);
			set_active_playlist(next.active_playlist);
			set_active_track_index(next.active_track_index);
			set_is_player_open(next.is_player_open);
		};
		window.addEventListener('popstate', handle_pop);
		return () => window.removeEventListener('popstate', handle_pop);
	}, []);

	useEffect(() => {
		const handle_key = (event: KeyboardEvent) => {
			if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
			const target = event.target as HTMLElement | null;
			if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;
			if (playlist_projects.length === 0) return;
			event.preventDefault();
			if (event.key === 'ArrowLeft') handle_bottom_bar_previous();
			else handle_bottom_bar_next();
		};
		window.addEventListener('keydown', handle_key);
		return () => window.removeEventListener('keydown', handle_key);
	}, [handle_bottom_bar_previous, handle_bottom_bar_next, playlist_projects.length]);

	return (
		<div className="bg-background min-h-screen w-full">
			{playlist_screen_id === null ? (
				<LandingScreen
					face_src={'profile_cover.jpg'}
					playlists={playlists}
					projects={projects}
					on_select_playlist={on_select_playlist}
					on_select_playlist_play={on_select_playlist_play}
					on_select_project={on_select_project}
				/>
			) : (
				<PlaylistScreen playlist_id={playlist_screen_id} on_back={on_back} on_select_playlist_play={on_select_playlist_play} on_select_project={on_select_playlist_project_play} />
			)}

			<div
				className={`bg-background fixed inset-x-0 top-0 bottom-0 z-20 overflow-y-auto transition-transform duration-500 ease-out ${is_player_open ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
			>
				<AudioplayerScreen project={playlist_projects[active_track_index]} />
			</div>

			<div className="fixed inset-x-0 bottom-0 z-30">
				<BottomBar
					project={playlist_projects[active_track_index]}
					viewed={playlist_projects.length >= 1 ? active_track_index + 1 : 0}
					total={playlist_projects.length}
					progress={(active_track_index + 1) / playlist_projects.length}
					socials={socials}
					on_previous={handle_bottom_bar_previous}
					on_next={handle_bottom_bar_next}
					on_toggle={on_toggle_player}
					is_player_open={is_player_open}
				/>
			</div>
		</div>
	);
}

export default App;
