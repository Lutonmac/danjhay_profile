export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://irbnmjwdaqrvhhzwrsmc.supabase.co';
    const response = await fetch(`${supabaseUrl}/auth/v1/health`);
    const data = await response.json();
    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
