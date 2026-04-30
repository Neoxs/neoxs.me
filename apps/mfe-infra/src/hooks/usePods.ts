import { useEffect, useState } from 'react'

export interface Pod {
  name: string
  status: string
  ready: boolean
  restarts: number
  age: string
}

const MOCK_PODS: Pod[] = [
  { name: 'shell-7d9f8b-xk2p', status: 'Running', ready: true, restarts: 0, age: '2d' },
  { name: 'mfe-blog-6c4d7a-mn9q', status: 'Running', ready: true, restarts: 0, age: '1d' },
  { name: 'mfe-lab-5b3e6c-pq4r', status: 'Running', ready: true, restarts: 1, age: '6h' },
  { name: 'mfe-infra-4a2d5b-rs7t', status: 'Running', ready: true, restarts: 0, age: '6h' },
]

export function usePods() {
  const [pods, setPods] = useState<Pod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPods() {
      try {
        // In dev without K8s: vite proxy returns 404, fall back to mock
        const res = await fetch('/api/pods', { signal: controller.signal })

        if (!res.ok) throw new Error(`${res.status}`)

        const data = await res.json()
        const mapped: Pod[] = data.items.map((pod: any) => ({
          name: pod.metadata.name,
          status: pod.status.phase,
          ready: pod.status.containerStatuses?.[0]?.ready ?? false,
          restarts: pod.status.containerStatuses?.[0]?.restartCount ?? 0,
          age: pod.metadata.creationTimestamp,
        }))
        setPods(mapped)
      } catch {
        // No K8s in dev — use mock data, not an error
        setPods(MOCK_PODS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPods()
    // Poll every 30s for live updates
    const interval = setInterval(fetchPods, 30_000)

    return () => {
      controller.abort()
      clearInterval(interval)
    }
  }, [])

  return { pods, isLoading, error }
}