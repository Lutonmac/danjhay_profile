const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('tracks').select('*');
  console.log("Tracks:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
}
run();
