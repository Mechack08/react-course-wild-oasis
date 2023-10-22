import { createClient } from "@supabase/supabase-js";

export const superbaseUrl = "https://obaoavhnxrdcdvrvvfrm.supabase.co";
const superbaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYW9hdmhueHJkY2R2cnZ2ZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyOTI5NzgsImV4cCI6MjAxMDg2ODk3OH0.qWJOho5zrLExI-kL8j7FdrmLCYzvPKVCwiQyXRqiNKE";

export const supabase = createClient(superbaseUrl, superbaseKey);
