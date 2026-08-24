import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { ArrowSquareOut, GithubLogo, X } from '@phosphor-icons/react';
import TrackingImage from '@/components/TrackingImage';
import TrackInfoTags from '@/components/TrackInfoTags';
import type { Project, ShowcaseItem } from '@/types/portfolio';
import { getColorSync } from 'colorthief';
import Dither from '@/components/Dither';

type PanelTab = 'info' | 'showcase';

interface AudioplayerScreenProps {
	project: Project | undefined;
}

function format_years(project: Project) {
	const start_year = project.start.year;
	const end_year = project.end === 'present' ? 'Present' : project.end.year;
	return start_year === end_year && project.end !== 'present' ? `${start_year}` : `${start_year} – ${end_year}`;
}

function format_role(project: Project) {
	return project.role === 'self' ? 'Self' : project.role === 'group' ? 'Group' : 'Contribution';
}

const markdown_components = {
	h1: (props: object) => <h1 className="text-title mb-3 text-2xl font-bold" {...props} />,
	h2: (props: object) => <h2 className="text-title mt-5 mb-2 text-xl font-semibold" {...props} />,
	h3: (props: object) => <h3 className="text-title mt-4 mb-2 text-lg font-semibold" {...props} />,
	p: (props: object) => <p className="text-text/90 mb-3 leading-relaxed" {...props} />,
	ul: (props: object) => <ul className="text-text/90 mb-3 list-disc space-y-1 pl-5" {...props} />,
	ol: (props: object) => <ol className="text-text/90 mb-3 list-decimal space-y-1 pl-5" {...props} />,
	a: (props: object) => <a className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer" {...props} />,
	strong: (props: object) => <strong className="text-title font-semibold" {...props} />,
	code: (props: object) => <code className="bg-card rounded-[2px] px-1.5 py-0.5 text-sm" {...props} />,
};

export default function AudioplayerScreen({ project }: AudioplayerScreenProps) {
	const [active_tab, set_active_tab] = useState<PanelTab>('info');
	const [expanded, set_expanded] = useState<ShowcaseItem | null>(null);

	const cover_ref = useRef<HTMLImageElement>(null);

	const [wave_color, set_wave_color] = useState<[number, number, number]>([0.4745, 0, 0.5647]);

	const [orientations, set_orientations] = useState<Record<string, 'portrait' | 'landscape'>>({});

	const [info_markdown, set_info_markdown] = useState<string>('');

	const project_id = project?.id;
	useEffect(() => {
		if (!project_id) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			set_info_markdown('');
			return;
		}
		let cancelled = false;
		set_info_markdown('');
		fetch(`info/${project_id}.md`)
			.then((response) => (response.ok ? response.text() : ''))
			.then((text) => {
				if (!cancelled) set_info_markdown(text);
			})
			.catch(() => {
				if (!cancelled) set_info_markdown('');
			});
		return () => {
			cancelled = true;
		};
	}, [project_id]);

	const handle_showcase_load = (src: string, img: HTMLImageElement) => {
		const orientation = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
		set_orientations((prev) => (prev[src] === orientation ? prev : { ...prev, [src]: orientation }));
	};

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

	const tab_class = (tab: PanelTab) =>
		`border-b-2 px-1 pb-2 text-sm font-medium transition-colors ${active_tab === tab ? 'border-primary text-text' : 'border-transparent text-tab-inactive hover:text-text'}`;

	if (project === undefined) return null;

	return (
		<section className="z-20 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-12 pb-28 lg:h-[calc(100dvh-5rem)] lg:flex-row lg:items-start lg:gap-14 lg:pb-0">
			<div className="pointer-events-none absolute inset-0 z-0 opacity-80">
				<Dither waveColor={wave_color} waveSpeed={0.05} waveFrequency={0.05} waveAmplitude={1} colorNum={10} pixelSize={3} enableMouseInteraction={false} disableAnimation={false} />
			</div>

			<div className="via-background/60 to-background from-background/10 pointer-events-auto absolute inset-0 z-[1] bg-gradient-to-r" />

			<img ref={cover_ref} src={project.cover.src} alt="" aria-hidden className="hidden" crossOrigin="anonymous" onLoad={handle_cover_load} />

			<div className="z-10 flex justify-center lg:w-[45%] lg:shrink-0 lg:pt-6">
				<TrackingImage src={project.cover.src} alt={project.cover.alt} className="w-full max-w-sm" />
			</div>

			<div className="z-10 flex min-w-0 flex-1 flex-col lg:h-full">
				<header className="shrink-0">
					<h1 className="text-title text-3xl font-bold">{project.title}</h1>
					<p className="text-subtext mt-1 text-sm">
						{format_role(project)} · {format_years(project)}
					</p>
					<TrackInfoTags skills={project.skills} size={22} className="mt-4" />
				</header>

				<nav className="border-line mt-8 flex shrink-0 items-center gap-6 border-b-2">
					<button type="button" onClick={() => set_active_tab('info')} className={tab_class('info')}>
						Info
					</button>
					<button type="button" onClick={() => set_active_tab('showcase')} className={tab_class('showcase')}>
						Showcase
					</button>
					{project.demo_url && (
						<a
							href={project.demo_url}
							target="_blank"
							rel="noreferrer"
							className="text-tab-inactive hover:text-text flex items-center gap-1.5 border-b-2 border-transparent px-1 pb-2 text-sm font-medium transition-colors"
						>
							Demo
							<ArrowSquareOut size={16} />
						</a>
					)}
					{project.github_url && (
						<a
							href={project.github_url}
							target="_blank"
							rel="noreferrer"
							aria-label="Open GitHub repository"
							className="text-tab-inactive hover:text-text ml-auto border-b-2 border-transparent px-1 pb-2 transition-colors"
						>
							<GithubLogo size={20} />
						</a>
					)}
				</nav>

				<div className="mt-6 flex-1 lg:overflow-y-auto lg:[mask-image:linear-gradient(to_bottom,black_calc(100%_-_4rem),transparent)] lg:pr-2 lg:pb-16 lg:[-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%_-_4rem),transparent)]">
					{active_tab === 'info' && (
						<div className="max-w-prose">
							<Markdown components={markdown_components}>{info_markdown}</Markdown>
						</div>
					)}

					{active_tab === 'showcase' &&
						(project.showcase.length === 0 ? (
							<p className="text-deeptext text-sm">No showcase items yet.</p>
						) : (
							<div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
								{project.showcase.map((item, index) => (
									<button
										key={`${item.src}-${index}`}
										type="button"
										onClick={() => set_expanded(item)}
										className={`border-line bg-card aspect-square overflow-hidden rounded-[2px] border-2 transition-opacity hover:opacity-80 sm:aspect-auto ${orientations[item.src] === 'landscape' ? 'sm:col-span-2' : ''}`}
									>
										<img
											src={item.src}
											alt={item.alt}
											onLoad={(event) => handle_showcase_load(item.src, event.currentTarget)}
											className="block h-full w-full object-cover sm:h-auto"
											draggable={false}
										/>
									</button>
								))}
							</div>
						))}
				</div>
			</div>

			{expanded && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => set_expanded(null)}>
					<button type="button" aria-label="Close" className="text-tab-inactive hover:text-text absolute top-5 right-5 transition-colors" onClick={() => set_expanded(null)}>
						<X size={28} />
					</button>
					<img src={expanded.src} alt={expanded.alt} className="border-line max-h-full max-w-full rounded-[2px] border-2 object-contain" onClick={(event) => event.stopPropagation()} />
				</div>
			)}
		</section>
	);
}
