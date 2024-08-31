import { FunctionComponent, ReactNode } from 'react'

import { ScanMethod } from '~/packlets/tagScanner/constants'
import { Input } from '~/packlets/tagScanner/input'
import { Methods } from '~/packlets/tagScanner/methods'
import { useTagScannerUrlHandler } from '~/packlets/tagScanner/useTagScannerUrlHandler'

interface Props {
  children: (value: string, method: ScanMethod) => ReactNode
  allowedMethods?: ScanMethod[]
}

export const TagScanner: FunctionComponent<Props> = ({
  children,
  allowedMethods,
}) => {
  const { method, tag } = useTagScannerUrlHandler()

  if (!method) return <Methods allowedMethods={allowedMethods} />
  else if (!tag) return <Input />

  return children(tag, method)
}
