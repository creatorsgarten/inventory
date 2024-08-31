import { useMutation } from '@tanstack/react-query'
import { createTag } from '~/packlets/data/createTag'

interface Options {
  onSuccess?: () => void
}

export const useAddTagHandler = ({ onSuccess }: Options) => {
  const { mutateAsync, isLoading, isError } = useMutation<
    string,
    unknown,
    string
  >({
    mutationFn: async tagId =>
      createTag({
        id: tagId,
      }),
    onSuccess,
  })

  return {
    mutateAsync,
    isLoading,
    isError,
  }
}
