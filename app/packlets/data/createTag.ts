export interface CreateTagPayload {
  id: string
}

export const createTag = async (payload: CreateTagPayload) => {
  // do some magic
  await new Promise(resolve => setTimeout(resolve, 2000))

  // returns tag id
  return '9212a0c1-ed67-4ab3-8478-63421875e371'
}
