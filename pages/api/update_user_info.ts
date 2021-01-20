
const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {
  const formData = new URLSearchParams();
  for(let key in req.body){
    formData.append(key.toString(), req.body[key]);
  }
  let url = new URL(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/update_info`)
  const response = await fetch(url.toString(), {
    method: "POST",
    credentials: "include",
    headers: {
      "cookie": req.headers.cookie,
      'Content-Type': 'application/json'
    },
    body: req.body,
  })
  if (response.ok) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const data = await response.json();
    res.end(JSON.stringify(data));
  } else {
    console.log(response);
    res.statusCode = 404;
    res.end();
  }
}