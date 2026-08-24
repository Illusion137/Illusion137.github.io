import { Play } from '@phosphor-icons/react';
import type { MouseEvent } from 'react';
import type { Playlist } from '@/types/portfolio';

export interface PlaylistComponentProps {
	playlist: Playlist;
	on_select_playlist?: (playlist: Playlist) => void;
	on_select_playlist_play?: (playlist: Playlist) => void;
}

export default function PlaylistComponent({ playlist, on_select_playlist, on_select_playlist_play }: PlaylistComponentProps) {
	const stop = (event: MouseEvent) => event.stopPropagation();

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => on_select_playlist?.(playlist)}
			className="group border-line bg-card hover:bg-track flex w-40 shrink-0 cursor-pointer flex-col gap-2 rounded-[2px] border-1 p-3 text-left transition-colors"
		>
			<div className="relative w-full">
				<img src={playlist.cover.src} alt={playlist.cover.alt} className="border-line bg-background aspect-square w-full rounded-[2px] object-cover" draggable={false} />
				<button
					type="button"
					onClick={(event) => {
						stop(event);
						on_select_playlist_play?.(playlist);
					}}
					aria-label={`Play ${playlist.title}`}
					className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-black"
				>
					<Play size={18} weight="fill" />
				</button>
			</div>
			<div className="min-w-0">
				<p className="text-title truncate font-semibold">{playlist.title}</p>
				<p className="text-subtext truncate text-xs">{playlist.description}</p>
			</div>
		</div>
	);
}
