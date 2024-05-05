import { Button } from '@chakra-ui/react'

import { ScanLayout } from '~/packlets/scan/layout'
import { QR } from '~/packlets/scan/input/qr'
import { Icon } from '~/packlets/commons/icon'
import { ScanMethod } from '~/packlets/scan/constants'
import { useStepsUrlHandler } from '~/packlets/scan/useStepsUrlHandler'
import { Manual } from '~/packlets/scan/input/manual'

export const InputStep = () => {
  const { method, resetMethod } = useStepsUrlHandler()

  return (
    <ScanLayout
      title="Identify"
      subtitle="Follow instructions to identify the item."
      menu={(
        <Button lineHeight={0} onClick={resetMethod}>
          <Icon icon="lucide:chevron-left" mr={2} /> Back
        </Button>
      )}
    >
      {method === ScanMethod.QR ? (
        <QR />
      ) : method === ScanMethod.Manual ? (
        <Manual />
      ) : null}
    </ScanLayout>
  )
}
