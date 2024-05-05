import { FunctionComponent, useEffect, useState } from 'react'
import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useDeviceList } from '@yudiel/react-qr-scanner'

import { Icon } from '~/packlets/commons/icon'

interface Props {
  onChange?: (deviceId: string) => void
}

export const Devices: FunctionComponent<Props> = ({ onChange }) => {
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>()
  const devices = useDeviceList()

  useEffect(() => {
    if (devices.length > 0)
      setSelectedDevice(devices[0])
  }, [devices])

  useEffect(() => {
    if (selectedDevice?.deviceId)
      onChange?.(selectedDevice?.deviceId)
  }, [selectedDevice])

  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
        alignItems="center"
      >
        <HStack spacing={2}>
          <Icon icon="lucide:camera" />
          <Text noOfLines={1}>
            {selectedDevice?.label ?? 'Camera'}
          </Text>
          <Icon icon="lucide:chevron-down" />
        </HStack>
      </MenuButton>
      <MenuList zIndex={9999}>
        {devices.map(device => (
          <MenuItem
            key={`qr-scanner-device-${device.deviceId}`}
            onClick={() => setSelectedDevice(device)}
          >
            <HStack spacing={2}>
              <Text>{device.label}</Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
