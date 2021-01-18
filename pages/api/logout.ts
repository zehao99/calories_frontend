const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/logout`,
      {
        method: "GET",
        headers: {
          "cookie": req.headers.cookie
        },
        credentials: 'include'
      }
    )
  if (response.ok) {
    res.statusCode = 200;
    console.log(response.headers);
    res.setHeader("set-cookie", response.headers.get("set-cookie"));
    res.end();
  } else {
    res.statusCode = 401;
    res.end();
  }
}