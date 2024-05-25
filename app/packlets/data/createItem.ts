export interface CreateItemPayload {
  name: string
  description: string
  tag?: string
}

export const createItem = async (payload: CreateItemPayload) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  // returns item id
  return '9212a0c1-ed67-4ab3-8478-63421875e371'
}
