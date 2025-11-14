import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Dashboard } from '@/components/pages/dashboard'
import { ErrorBoundary } from '@/components/error-boundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <Dashboard />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
