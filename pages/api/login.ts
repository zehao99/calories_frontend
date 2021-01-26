// /api/token
// calories.page/api/token  -> backendhost:backenport/api/login


import {stringify} from "querystring";

const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {
  const formData = new URLSearchParams();
  for (let key in req.body) {
    formData.append(key.toString(), req.body[key]);
  }
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formData.toString(),
  })
  if (response.ok) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('set-cookie', response.headers.get('set-cookie'));
    const data = await response.json();
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 401;
    res.end();
  }
}