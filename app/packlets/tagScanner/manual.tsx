import { HStack, PinInput, PinInputField, VStack, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { parseId } from '~/packlets/commons/parseId'
import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'

export const Manual = () => {
  const { setTag } = useTagScannerUrlHandler()

  const [value, setValue] = useState('')
  const handleInput = (input: string) => {
    setValue(input.toUpperCase())

    if (input.length === 7) handleSubmit(input.toUpperCase())
  }

  const handleSubmit = (id: string) => {
    if (parseId(id) !== null) setTag(id)
  }

  return (
    <VStack>
      <Text textColor="gray.700" fontSize="sm">
        Please type tag ID below
      </Text>
      <HStack justify="center" fontFamily="monospace">
        <PinInput type="alphanumeric" value={value} onChange={handleInput}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </VStack>
  )
}
