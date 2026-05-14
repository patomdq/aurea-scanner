const FMP_KEY = 'XPfNnraUVCbn6rnjJFUMkaJXrXm2K4JQ';
const FMP = 'https://financialmodelingprep.com/api/v3';

async function fmpFetch(endpoint) {
  const res = await fetch(`${FMP}${endpoint}&apikey=${FMP_KEY}`);
  if (!res.ok) throw new Error(`FMP ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const [gainers, losers, actives] = await Promise.all([
      fmpFetch('/gainers?'),
      fmpFetch('/losers?'),
      fmpFetch('/actives?')
    ]);
    res.status(200).json({ gainers, losers, actives });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
