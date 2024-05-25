import { useState } from 'react'
import { useNavigate } from '@remix-run/react'

import { createItem } from '~/packlets/data/createItem'

export const useAddItemModalHandler = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleAddItem = async () => {
    setLoading(true)
    setError(true)

    try {
      const createdItemId = await createItem({ name: 'name', description: 'description' })
      navigate(`/items/${createdItemId}`)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handle: handleAddItem
  }
}
