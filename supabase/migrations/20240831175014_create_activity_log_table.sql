-- Create the inventory_activity_log table if it doesn't exist
CREATE TABLE IF NOT EXISTS inventory_activity_log (
  id UUID DEFAULT uuid7() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
