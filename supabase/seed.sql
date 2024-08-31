-- https://supabase.com/docs/guides/api/using-custom-schemas
CREATE SCHEMA inventorygarten;
GRANT USAGE ON SCHEMA inventorygarten TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA inventorygarten TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA inventorygarten TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA inventorygarten TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA inventorygarten GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA inventorygarten GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA inventorygarten GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
