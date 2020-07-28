// /api/token
// calories.page/api/token  -> backendhost:backenport/api/login


const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {


  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/user`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + req.body
    }
  })
  if (response.ok) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const data = await response.json()
    console.log(data);
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end();
  }
}