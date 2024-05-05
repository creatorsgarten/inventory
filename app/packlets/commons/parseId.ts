export const parseId = (input: string) => {
  const matcher = input.match(/^([A-Za-z]{2})(\d{5})$/)

  if (matcher === null)
    return null

  return {
    raw: input,
    prefix: matcher[1],
    number: matcher[2]
  }
}
