-- Enable RLS on all tables
DO $$
DECLARE
    v_table_name text;
BEGIN
    FOR v_table_name IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'inventorygarten')
    LOOP
        EXECUTE format('ALTER TABLE inventorygarten.%I ENABLE ROW LEVEL SECURITY', v_table_name);
    END LOOP;
END $$;

-- Create or replace policies for each table
DO $$
DECLARE
    v_table_name text;
BEGIN
    FOR v_table_name IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'inventorygarten')
    LOOP
        -- Drop existing policies if any
        EXECUTE format('DROP POLICY IF EXISTS allow_read ON inventorygarten.%I', v_table_name);
        -- Create new read-only policy
        EXECUTE format('CREATE POLICY allow_read ON inventorygarten.%I FOR SELECT USING (true)', v_table_name);
    END LOOP;
END $$;

-- Revoke all privileges from public
DO $$
DECLARE
    v_table_name text;
BEGIN
    FOR v_table_name IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'inventorygarten')
    LOOP
        EXECUTE format('REVOKE ALL ON inventorygarten.%I FROM PUBLIC', v_table_name);
    END LOOP;
END $$;

-- Grant select to public
DO $$
DECLARE
    v_table_name text;
BEGIN
    FOR v_table_name IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'inventorygarten')
    LOOP
        EXECUTE format('GRANT SELECT ON inventorygarten.%I TO PUBLIC', v_table_name);
    END LOOP;
END $$;
