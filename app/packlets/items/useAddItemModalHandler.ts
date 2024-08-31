import { useMutation } from '@tanstack/react-query'
import { CreateItemPayload, createItem } from '~/packlets/data/createItem'

interface Options {
  onSuccess?: () => void
}

export const useAddItemHandler = ({ onSuccess }: Options) => {
  return useMutation<string, unknown, CreateItemPayload>({
    mutationFn: createItem,
    onSuccess,
  })
}
