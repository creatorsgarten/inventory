import { Scanner as YudielScanner } from '@yudiel/react-qr-scanner'
import { VStack } from '@chakra-ui/react'
import { FunctionComponent, useCallback, useState } from 'react'

import { parseId } from '~/packlets/commons/parseId'

import { Devices } from './devices'
import { readerStateAtom } from './readerStateAtom'

interface Props {
  onScan?: (url: string) => void
}

export const Scanner: FunctionComponent<Props> = ({ onScan }) => {
  const [deviceId, setDeviceId] = useState<string>()

  const handleScan = useCallback((url: string) => {
    if (readerStateAtom.get() === 'stop')
      return

    console.log('scanned:', url)

    const idFromLastChunkOfUrl = url.match(/.+\/(\w+)$/)?.[1]

    if (idFromLastChunkOfUrl !== undefined && parseId(idFromLastChunkOfUrl) !== null) {
      console.log(idFromLastChunkOfUrl)
      onScan?.(idFromLastChunkOfUrl)
    }
  }, [onScan])

  return (
    <VStack align="start">
      <Devices onChange={d => setDeviceId(d)} />
      <YudielScanner
        onResult={handleScan}
        options={{
          deviceId,
          delayBetweenScanAttempts: 500,
          delayBetweenScanSuccess: 500,
          tryPlayVideoTimeout: 10000,
          constraints: {
            facingMode: 'environment',
            width: { min: 640, ideal: 720, max: 1920 },
            height: { min: 640, ideal: 720, max: 1080 }
          },
        }}
        styles={{
          video: {
            objectFit: 'cover'
          },
        }}
        components={{
          count: false,
          audio: false,
          tracker: false,
        }}
      />
    </VStack>
  )
}
