import { Heading, Text } from "@chakra-ui/react"
import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  json,
  useLoaderData,
} from "@remix-run/react"

import { Timeline } from '~/packlets/timeline'

import { MainContainer } from "~/packlets/layout/mainContainer"
import { getTagById } from '~/packlets/data/getTagById'
import { getTagLogs } from '~/packlets/data/getTagLogs'

import type { SerializeFrom } from "@remix-run/server-runtime"

export const clientLoader = async (args: ClientLoaderFunctionArgs) => {
  if (!args.params.id)
    throw new Response(null, {
      status: 404,
    })

  const tag = await getTagById(args.params.id)

  if (tag === null) {
    throw new Response(null, {
      status: 404,
    })
  }

  const logs = await getTagLogs(args.params.id)

  return json({ tag, logs })
}

export const meta: MetaFunction<typeof clientLoader> = (args) => {
  const data = args.data as SerializeFrom<typeof clientLoader>
  return [{ title: data.tag.id + " — Creatorsgarten Inventory" }]
}

const Page = () => {
  const { tag, logs } = useLoaderData<typeof clientLoader>()

  return (
    <MainContainer>
      <Heading mb="4">{tag.id}</Heading>
      <Timeline name="Item" logs={logs} />
    </MainContainer>
  )
}

export default Page
