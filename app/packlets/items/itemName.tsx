import { FunctionComponent, useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Item } from '~/packlets/commons/types'
import { backend } from '~/backend'

// Simple batching mechanism using a Map to collect IDs
const batchingQueue = new Map<string, ((item: Item | null) => void)[]>()
const processBatchTimeout = { current: null as NodeJS.Timeout | null }
const MAX_BATCH_SIZE = 30
const BATCHING_TIMEOUT = 20 // 20ms debounce

// Function to process the current batch
const processBatch = async () => {
  processBatchTimeout.current = null
  
  if (batchingQueue.size === 0) return
  
  // Take up to MAX_BATCH_SIZE ids from the queue
  const idsToProcess = [...batchingQueue.keys()].slice(0, MAX_BATCH_SIZE)
  
  // Get callbacks for these ids
  const callbacks = idsToProcess.map(id => {
    const cbs = batchingQueue.get(id) || []
    batchingQueue.delete(id)
    return { id, callbacks: cbs }
  })
  
  try {
    // Make a single query with all ids
    const items = await backend.describeInventoryItems({ ids: idsToProcess })
    
    // Call each callback with the appropriate item
    callbacks.forEach(({ id, callbacks }) => {
      const item = items.find(item => item.id === id) || null
      callbacks.forEach(cb => cb(item))
    })
  } catch (error) {
    // If query fails, call all callbacks with null
    callbacks.forEach(({ callbacks }) => {
      callbacks.forEach(cb => cb(null))
    })
  }
  
  // If there are more ids in the queue, process them
  if (batchingQueue.size > 0) {
    processBatchTimeout.current = setTimeout(processBatch, BATCHING_TIMEOUT)
  }
}

// Function to add an id to the batch queue
const queueItemFetch = (id: string): Promise<Item | null> => {
  return new Promise((resolve) => {
    // Add this id's callback to the queue
    if (!batchingQueue.has(id)) {
      batchingQueue.set(id, [])
    }
    batchingQueue.get(id)!.push(resolve)
    
    // Schedule batch processing if not already scheduled
    if (!processBatchTimeout.current) {
      processBatchTimeout.current = setTimeout(processBatch, BATCHING_TIMEOUT)
    }
  })
}

// React Query key for item data
export const itemQueryKey = (id: string) => ['item', id]

interface Props {
  id: string
  fallback?: string
}

export const ItemName: FunctionComponent<Props> = ({ id, fallback }) => {
  const queryClient = useQueryClient()
  
  // Use react-query to manage the cache and UI state
  const { data: item, isLoading } = useQuery({
    queryKey: itemQueryKey(id),
    queryFn: async () => queueItemFetch(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  // Prefetch when component mounts to trigger the batching
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: itemQueryKey(id),
      queryFn: async () => queueItemFetch(id),
    })
  }, [id, queryClient])
  
  if (isLoading) {
    return <Text as="span">{fallback || id}</Text>
  }
  
  return <Text as="span">{item?.name || fallback || id}</Text>
}