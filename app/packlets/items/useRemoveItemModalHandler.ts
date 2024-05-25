import { useNavigate, useRevalidator } from '@remix-run/react'
import { useState } from 'react'

import { createItem } from '~/packlets/data/createItem'
import { removeItem } from '~/packlets/data/removeItem'

export const useRemoveItemModalHandler = (onClose: () => void) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { revalidate } = useRevalidator()

  const handle = async (itemId: string) => {
    setLoading(true)
    setError(true)

    removeItem(itemId)
      .then(() => {
        revalidate()
        onClose()
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })

    try {
      await createItem({ name: 'name', description: 'description' })
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handle,
  }
}
