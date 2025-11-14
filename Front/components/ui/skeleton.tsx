export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12" />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-4">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-8 w-16" />
    </div>
  )
}
