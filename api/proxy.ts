export default async function handler(req, res) {
  const response = await fetch('http://localhost:3000/wp-json' + req.url, {
      method: req.method,
      headers: {
          ...req.headers,
          host: undefined, // Remove host header
      },
      body: req.body,
  });

  const data = await response.json();

  res.status(response.status).json(data);
}
