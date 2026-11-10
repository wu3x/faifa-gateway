-- Preserve the current total and never drop below 5,452.
INSERT INTO public.site_analytics (id, visitor_count) VALUES (1, 5452)
ON CONFLICT (id) DO UPDATE
SET visitor_count = GREATEST(public.site_analytics.visitor_count, 5452),
    updated_at = now();

CREATE TABLE IF NOT EXISTS public.unique_site_visitors (
  visitor_id uuid PRIMARY KEY,
  first_seen_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.unique_site_visitors ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.unique_site_visitors FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.register_unique_visitor(p_visitor_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_count integer;
  total integer;
BEGIN
  INSERT INTO public.unique_site_visitors (visitor_id) VALUES (p_visitor_id)
  ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;

  IF inserted_count > 0 THEN
    UPDATE public.site_analytics
       SET visitor_count = visitor_count + 1, updated_at = now()
     WHERE id = 1 RETURNING visitor_count INTO total;
  ELSE
    SELECT visitor_count INTO total FROM public.site_analytics WHERE id = 1;
  END IF;
  RETURN total;
END;
$$;
REVOKE ALL ON FUNCTION public.register_unique_visitor(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_unique_visitor(uuid) TO anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_visitor_count() FROM PUBLIC, anon, authenticated;
