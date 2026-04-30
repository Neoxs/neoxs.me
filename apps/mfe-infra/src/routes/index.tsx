import { createFileRoute } from '@tanstack/react-router'
import { usePods } from '#/hooks/usePods'

export const Route = createFileRoute('/')({
  component: InfraDashboard,
})

function InfraDashboard() {
  const { pods, isLoading, error } = usePods()

  if (isLoading) return <p className="p-8 text-zinc-400 font-mono text-sm">fetching pods...</p>
  if (error) return <p className="p-8 text-red-400 font-mono text-sm">error: {error}</p>

  const healthy = pods.filter(p => p.ready).length

  return (
    <main className="p-8 font-mono">
      <p className="text-xs text-emerald-500 tracking-widest mb-2">// LIVE CLUSTER</p>
      <h1 className="text-3xl text-zinc-100 mb-1">Infrastructure</h1>
      <p className="text-sm text-zinc-500 mb-8">{healthy}/{pods.length} pods healthy</p>

      <div className="border border-zinc-800 rounded-sm overflow-hidden">
        <div className="grid grid-cols-5 px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-500 tracking-widest">
          <span>STATUS</span>
          <span className="col-span-2">NAME</span>
          <span>RESTARTS</span>
          <span>AGE</span>
        </div>
        {pods.map(pod => (
          <div
            key={pod.name}
            className="grid grid-cols-5 px-4 py-3 border-b border-zinc-900 last:border-0 text-xs hover:bg-zinc-900/50 transition-colors"
          >
            <span className={pod.ready ? 'text-emerald-500' : 'text-yellow-500'}>
              {pod.ready ? '● Running' : '○ Pending'}
            </span>
            <span className="col-span-2 text-zinc-300">{pod.name}</span>
            <span className="text-zinc-500">{pod.restarts}</span>
            <span className="text-zinc-500">{pod.age}</span>
          </div>
        ))}
      </div>
    </main>
  )
}