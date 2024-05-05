import { Button } from '@chakra-ui/react'
import { useLocation } from '@remix-run/react'

import { ScanLayout } from '~/packlets/scan/layout'
import { QR } from '~/packlets/scan/input/qr'
import { Icon } from '~/packlets/commons/icon'
import { ScanMethod } from '~/packlets/scan/constants'
import { useStepsUrlHandler } from '~/packlets/scan/useStepsUrlHandler'

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
      ) : null}
    </ScanLayout>
  )
}
