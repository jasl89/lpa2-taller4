import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  color: 'orange' | 'violet' | 'blue' | 'green'
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    violet: 'bg-violet-100 text-violet-600 border-violet-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
  }

  return (
    <div className={`p-6 bg-white rounded-lg border shadow-sm ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon size={40} className="opacity-50" />
      </div>
    </div>
  )
}
