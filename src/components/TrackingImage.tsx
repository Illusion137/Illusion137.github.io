import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface TrackingImageProps {
	src: string;
	alt: string;
	max_tilt?: number;
	className?: string;
}

export default function TrackingImage({ src, alt, max_tilt = 18, className = '' }: TrackingImageProps) {
	const container_ref = useRef<HTMLDivElement>(null);
	const card_ref = useRef<HTMLDivElement>(null);
	const glow_ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduce_motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (!reduce_motion && glow_ref.current) {
				gsap.to(glow_ref.current, {
					rotation: 360,
					transformOrigin: '50% 50%',
					duration: 6,
					ease: 'none',
					repeat: -1,
				});
			}

			const container = container_ref.current;
			const card = card_ref.current;
			if (reduce_motion || !container || !card) return;

			const rotate_x = gsap.quickTo(card, 'rotationX', {
				duration: 0.5,
				ease: 'power3.out',
			});
			const rotate_y = gsap.quickTo(card, 'rotationY', {
				duration: 0.5,
				ease: 'power3.out',
			});

			const handle_move = (event: PointerEvent) => {
				const rect = container.getBoundingClientRect();
				const px = (event.clientX - rect.left) / rect.width - 0.5;
				const py = (event.clientY - rect.top) / rect.height - 0.5;
				rotate_y(px * max_tilt);
				rotate_x(-py * max_tilt);
			};

			const handle_leave = () => {
				rotate_x(0);
				rotate_y(0);
			};

			container.addEventListener('pointermove', handle_move);
			container.addEventListener('pointerleave', handle_leave);

			return () => {
				container.removeEventListener('pointermove', handle_move);
				container.removeEventListener('pointerleave', handle_leave);
			};
		},
		{ scope: container_ref, dependencies: [max_tilt] },
	);

	return (
		<div ref={container_ref} className={`relative [perspective:1000px] ${className}`}>
			<div ref={card_ref} className="relative aspect-square h-full w-full [transform-style:preserve-3d]">
				<div aria-hidden className="pointer-events-none absolute inset-0 translate-y-6 rounded-[2px] bg-black/60 blur-2xl" />
				<div className="bg-card relative h-full w-full [transform:translateZ(40px)] overflow-hidden rounded-[2px]">
					<img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2px]"
						style={{
							padding: '2px',
							WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
							WebkitMaskComposite: 'xor',
							maskComposite: 'exclude',
						}}
					>
						<div
							ref={glow_ref}
							className="absolute blur-[1.5px]"
							style={{
								top: '-50%',
								left: '-50%',
								width: '200%',
								height: '200%',
								background: 'conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 290deg, rgba(255,255,255,0.95) 335deg, rgba(255,255,255,0) 360deg)',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
