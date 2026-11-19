ALTER TABLE map_layers DROP CONSTRAINT map_base_layer_enabled;
-- Keep repaired base layers enabled when rolling back.
