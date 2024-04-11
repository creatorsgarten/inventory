import { Container } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { singletonSupabase } from "~/backend/supabase";

export default function AuthPage() {
  return (
    <div>
      <Container maxW="md" height={16}>
        <Auth
          supabaseClient={singletonSupabase}
          appearance={{ theme: ThemeSupa }}
          providers={["keycloak"]}
        />
      </Container>
    </div>
  );
}
