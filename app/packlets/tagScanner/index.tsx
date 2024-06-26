import { FunctionComponent, ReactNode } from 'react'

import { Methods } from '~/packlets/tagScanner/methods'
import {
  useTagScannerUrlHandler
} from '~/packlets/tagScanner/useTagScannerUrlHandler'
import { Input } from '~/packlets/tagScanner/input'
import { ScanMethod } from '~/packlets/tagScanner/constants'

interface Props {
  children: (value: string, method: ScanMethod) => ReactNode
}

export const TagScanner: FunctionComponent<Props> = ({ children }) => {
  const { method, tag } = useTagScannerUrlHandler()

  if (!method)
    return <Methods />
  else if (!tag)
    return <Input />

  return children(tag, method)
}
