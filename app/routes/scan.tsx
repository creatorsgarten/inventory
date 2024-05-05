import { ChooseMethodStep } from '~/packlets/scan/steps/chooseMethod'
import { InputStep } from '~/packlets/scan/steps/input'
import { useStepsUrlHandler } from '~/packlets/scan/useStepsUrlHandler'

const Page = () => {
  const { method, item } = useStepsUrlHandler()

  if (!method)
    return <ChooseMethodStep />
  else if (!item)
    return <InputStep />

  return null
}

export default Page
