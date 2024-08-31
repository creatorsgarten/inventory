import { Container } from '@chakra-ui/react'
import { useStore } from '@nanostores/react'
import { useNavigate } from '@remix-run/react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useRef } from 'react'

import { backend } from '~/backend'
import { singletonSupabase } from '~/backend/supabase'

const Page = () => {
  const navigate = useNavigate()
  const authState = useStore(backend.$authState)

  const authenticated = authState.type === 'authenticated'
  const authenticatedRef = useRef(authenticated)

  useEffect(() => {
    if (!authenticatedRef.current && authenticated) {
      navigate('/', { replace: true })
    }
    authenticatedRef.current = authenticated
  }, [authenticated, navigate])

  return (
    <div>
      <Container maxW="md" height={16}>
        <Auth
          supabaseClient={singletonSupabase}
          appearance={{ theme: ThemeSupa }}
          providers={['keycloak']}
        />
      </Container>
    </div>
  )
}

export default Page
