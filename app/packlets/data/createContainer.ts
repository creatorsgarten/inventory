export interface CreateContainerPayload {
  name: string
  description: string
  tag: string
}

export const createContainer = async (payload: CreateContainerPayload) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  // returns container id
  return '9212a0c1-ed67-4ab3-8478-63421875e371'
}
