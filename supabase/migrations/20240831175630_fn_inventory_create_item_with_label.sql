CREATE OR REPLACE FUNCTION inventory_create_item_with_label(
  p_name TEXT,
  p_description TEXT,
  p_tag TEXT
) RETURNS UUID AS $$
DECLARE
  v_item_id UUID;
  v_label_id TEXT;
  v_user_id UUID;
BEGIN
  -- Get the user ID from the current session
  v_user_id := auth.uid();

  -- Create new item
  INSERT INTO inventory_items (name, description)
  VALUES (p_name, p_description)
  RETURNING id INTO v_item_id;

  -- Create new label if it doesn't exist
  INSERT INTO inventory_labels (id)
  VALUES (p_tag)
  ON CONFLICT (id) DO NOTHING
  RETURNING id INTO v_label_id;

  -- Attach item and label
  INSERT INTO inventory_label_attachments (item_id, label_id)
  VALUES (v_item_id, v_label_id);

  -- Log activity
  INSERT INTO activity_log (user_id, activity_type, activity_payload)
  VALUES (
    v_user_id,
    'create_item',
    jsonb_build_object(
      'item_id', v_item_id,
      'name', p_name,
      'description', p_description,
      'tag', p_tag
    )
  );

  RETURN v_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;