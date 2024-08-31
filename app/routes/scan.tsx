import { Button } from '@chakra-ui/react'

import { TagScanner } from '~/packlets/tagScanner'

import { ScanLayout } from '~/packlets/scan/layout'
import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'
import { Icon } from '~/packlets/commons/icon'
import { ScanMethod } from '~/packlets/tagScanner/constants'
import { nfcMonitorAtom } from '~/packlets/tagScanner/nfcMonitorAtom'

const Page = () => {
  const { method, tag, resetMethod } = useTagScannerUrlHandler()

  const handleResetMethod = () => {
    // cleanup scan state when cancel nfc scan
    if (method === ScanMethod.NFC) nfcMonitorAtom.set(null)

    resetMethod()
  }

  return (
    <ScanLayout
      title={!method ? 'Check-in' : !tag ? 'Identify' : ''}
      subtitle={
        !method
          ? 'Please choose a method to identify the item.'
          : !tag
            ? 'Follow instructions to identify the item.'
            : ''
      }
      menu={
        method && !tag ? (
          <Button lineHeight={0} onClick={handleResetMethod}>
            <Icon icon="lucide:chevron-left" mr={2} /> Back
          </Button>
        ) : null
      }
    >
      <TagScanner>{value => <div>{value}</div>}</TagScanner>
    </ScanLayout>
  )
}

export default Page
