-- Do not silently choose a base or renumber malformed historical maps.
DO $$
BEGIN
    IF EXISTS (
        SELECT map_id FROM map_layers GROUP BY map_id
        HAVING MIN(position) <> 1 OR MAX(position) <> COUNT(*)
            OR COUNT(DISTINCT position) <> COUNT(*)
    ) THEN
        RAISE EXCEPTION 'Repair non-contiguous or duplicate map layer positions before applying migration 32';
    END IF;
END $$;

UPDATE map_layers SET enabled = true WHERE position = 1 AND NOT enabled;
ALTER TABLE map_layers ADD CONSTRAINT map_base_layer_enabled CHECK (position <> 1 OR enabled);
