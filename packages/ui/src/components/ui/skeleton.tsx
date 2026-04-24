// @shadcn-version: 2.3.0
// @last-sync: 2026-04-23
// @upstream: https://github.com/shadcn-ui/ui
// @custom-modifications: none

import { cn } from '../../lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
