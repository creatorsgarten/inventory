import { Button } from '@chakra-ui/react'

import { TagScanner } from '~/packlets/tagScanner'

import { ScanLayout } from '~/packlets/scan/layout'
import {
  useTagScannerUrlHandler
} from '~/packlets/tagScanner/useTagScannerUrlHandler'
import { Icon } from '~/packlets/commons/icon'

const Page = () => {
  const { method, item, resetMethod } = useTagScannerUrlHandler()

  return (
    <ScanLayout
      title={!method ? 'Check-in' : !item ? 'Identify' : ''}
      subtitle={!method ? 'Please choose a method to identify the item.' : !item ? 'Follow instructions to identify the item.' : ''}
      menu={method && !item ? (
        <Button lineHeight={0} onClick={resetMethod}>
          <Icon icon="lucide:chevron-left" mr={2} /> Back
        </Button>
      ) : null}
    >
      <TagScanner>
        {value => (
          <div>{value}</div>
        )}
      </TagScanner>
    </ScanLayout>
  )
}

export default Page
