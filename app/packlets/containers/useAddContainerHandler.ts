import { useMutation } from '@tanstack/react-query'
import {
  CreateContainerPayload,
  createContainer,
} from '~/packlets/data/createContainer'

interface Options {
  onSuccess?: () => void
}

export const useAddContainerHandler = ({ onSuccess }: Options) => {
  return useMutation<string, unknown, CreateContainerPayload>({
    mutationFn: createContainer,
    onSuccess,
  })
}
