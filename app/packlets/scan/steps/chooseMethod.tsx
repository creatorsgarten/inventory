import { ScanLayout } from '~/packlets/scan/layout'
import { Methods } from '~/packlets/scan/methods'

export const ChooseMethodStep = () => (
  <ScanLayout
    title="Check-in"
    subtitle="Please choose a moethod to identify the item."
  >
    <Methods />
  </ScanLayout>
)
