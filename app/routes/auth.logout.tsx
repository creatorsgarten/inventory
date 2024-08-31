import { Button, Container, VStack } from '@chakra-ui/react'
import { Form, redirect } from '@remix-run/react'

import { backend } from '~/backend'

export const clientAction = async () => {
  await backend.logOut()
  return redirect('/')
}

const Page = () => {
  return (
    <div>
      <Container maxW="md" height={16}>
        <VStack spacing={4} alignItems="center">
          <Form method="POST">
            <Button type="submit">Click here to log out</Button>
          </Form>
        </VStack>
      </Container>
    </div>
  )
}

export default Page
