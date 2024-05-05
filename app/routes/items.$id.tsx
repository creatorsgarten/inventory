import { Heading, Text } from "@chakra-ui/react"
import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  json,
  useLoaderData,
} from "@remix-run/react"

import { Timeline } from '~/packlets/timeline'

import { MainContainer } from "~/packlets/layout/mainContainer"
import { getItemById } from '~/packlets/data/getItemById'
import { getItemLogs } from '~/packlets/data/getItemLogs'

import type { SerializeFrom } from "@remix-run/server-runtime"

export const clientLoader = async (args: ClientLoaderFunctionArgs) => {
  if (!args.params.id)
    throw new Response(null, {
      status: 404,
    })

  const matchedItem = await getItemById(args.params.id)

  if (matchedItem === null) {
    throw new Response(null, {
      status: 404,
    })
  }

  const logs = await getItemLogs(args.params.id)

  return json({ item: matchedItem, logs })
}

export const meta: MetaFunction<typeof clientLoader> = (args) => {
  const data = args.data as SerializeFrom<typeof clientLoader>
  return [{ title: data.item.name + " — Creatorsgarten Inventory" }]
}

const Page = () => {
  const { item, logs } = useLoaderData<typeof clientLoader>()

  return (
    <MainContainer>
      <Heading mb="4">{item.name}</Heading>
      <Text fontSize="xl">{item.description}</Text>
      <Text mt="8" whiteSpace="pre-line">
        {item.notes}
      </Text>
      <Timeline name="Item" logs={logs} />
    </MainContainer>
  )
}

export default Page
