const FMP_KEY = 'XPfNnraUVCbn6rnjJFUMkaJXrXm2K4JQ';
const FMP = 'https://financialmodelingprep.com/stable';

async function fmpFetch(path) {
  const url = `${FMP}/${path}?apikey=${FMP_KEY}`;
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) throw new Error(`FMP ${res.status}: ${text.substring(0,200)}`);
  return JSON.parse(text);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  try {
    const [gainers, losers, actives] = await Promise.all([
      fmpFetch('biggest-gainers'),
      fmpFetch('biggest-losers'),
      fmpFetch('most-active')
    ]);
    res.status(200).json({ gainers, losers, actives });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
