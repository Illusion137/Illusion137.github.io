interface ProgressBarProps {
	value: number;
	className?: string;
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
	const pct = Math.max(0, Math.min(1, value)) * 100;

	return (
		<div
			className={`h-0.5 w-full bg-line ${className}`}
			role="progressbar"
			aria-valuenow={Math.round(pct)}
			aria-valuemin={0}
			aria-valuemax={100}
		>
			<div
				className="h-full transition-[width] duration-300 ease-out"
				style={{
					width: `${pct}%`,
					background:
						'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
				}}
			/>
		</div>
	);
}
