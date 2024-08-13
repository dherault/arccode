import React, { CSSProperties } from 'react'

import { cn } from '~utils/ui'

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.1em',
      shimmerDuration = '3s',
      borderRadius = '0.25rem',
      background = '#328bff',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      type="button"
      style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-neutral-200 border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black dark:border-neutral-800',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[2px]',
        className,
      )}
      ref={ref}
      {...props}
    >
      {/* spark container */}
      <div
        className={cn(
          '-z-30 blur-[2px]',
          'absolute inset-0 overflow-visible [container-type:size]',
        )}
      >
        {/* spark */}
        <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          {/* spark before */}
          <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      {children}
      {/* Highlight */}
      <div
        className={cn(
          'cursor-pointer insert-0 absolute h-full w-full',

          'rounded px-4 py-2 text-sm font-medium',

          // transition
          'transform-gpu transition-all duration-300 ease-in-out',

          // on hover
          // 'group-hover:bg-blue-500/90',

          // on click
          // 'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]',
        )}
      />
      {/* backdrop */}
      <div
        className={cn(
          'absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]',
        )}
      />
    </button>
  ),
)

ShimmerButton.displayName = 'ShimmerButton'

export default ShimmerButton
