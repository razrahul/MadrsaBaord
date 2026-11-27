interface SectionWaveProps {
  variant?: 'default' | 'alt'
}

export function SectionWave({ variant = 'default' }: SectionWaveProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 220"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {variant === 'default' ? (
        <>
          <path
            d="M0 150 C 320 210, 620 40, 960 120 C 1180 170, 1340 90, 1440 60"
            stroke="var(--brand)"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          <path
            d="M0 170 C 340 225, 650 55, 990 135 C 1200 182, 1350 105, 1440 80"
            stroke="var(--brand)"
            strokeOpacity="0.06"
            strokeWidth="1.25"
          />
          <path
            d="M0 190 C 360 240, 680 75, 1020 150 C 1220 192, 1360 120, 1440 100"
            stroke="var(--accent)"
            strokeOpacity="0.08"
            strokeWidth="1.25"
          />
        </>
      ) : (
        <>
          <path
            d="M0 70 C 300 20, 600 185, 940 110 C 1180 58, 1330 130, 1440 155"
            stroke="var(--brand)"
            strokeOpacity="0.07"
            strokeWidth="1.5"
          />
          <path
            d="M0 95 C 320 42, 620 202, 965 128 C 1200 76, 1345 148, 1440 172"
            stroke="var(--accent)"
            strokeOpacity="0.07"
            strokeWidth="1.25"
          />
        </>
      )}
    </svg>
  )
}
