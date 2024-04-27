import { Heading, Text } from "@chakra-ui/react"
import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  json,
  useLoaderData,
} from "@remix-run/react"

import { backend } from "~/backend"
import { MainContainer } from "~/ui/MainContainer"

import type { SerializeFrom } from "@remix-run/server-runtime"

export const clientLoader = async (args: ClientLoaderFunctionArgs) => {
  const matchedItems = await backend.describeInventoryItems({
    id: args.params.id,
  })
  if (matchedItems.length === 0) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }
  if (matchedItems.length > 1) {
    throw new Error("Multiple items returned for the same ID")
  }
  return json({ item: matchedItems[0] })
}

export const meta: MetaFunction<typeof clientLoader> = (args) => {
  const data = args.data as SerializeFrom<typeof clientLoader>
  return [{ title: data.item.name + " — Creatorsgarten Inventory" }]
}

export default function Index() {
  const { item } = useLoaderData<typeof clientLoader>()
  return (
    <MainContainer>
      <Heading mb="4">{item.name}</Heading>
      <Text fontSize="xl">{item.description}</Text>
      <Text mt="8" whiteSpace="pre-line">
        {item.notes}
      </Text>
    </MainContainer>
  )
}
