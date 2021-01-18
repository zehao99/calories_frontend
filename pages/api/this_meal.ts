import {ParseMealToID} from "../../utils/parseMeal"
import {stringify} from "querystring";

const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {
  let date = new Date();

  function format(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  let today_date = format(date, "yyyy-MM-dd");

  let reqBody = JSON.parse(req.body);
  let meal_id = ParseMealToID(reqBody["currentMeal"]);
  let url = new URL(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/get_meal`)
  let params = {
    "date": today_date.toString(),
    "meal_id": meal_id.toString(),
  }

  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "cookie": req.headers.cookie,
    },
    credentials: "include"
  })
  if (response.ok) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let data = await response.json();
    if (data === null) data = "[]";
    res.json(data);
  } else {
    res.statusCode = 404;
    res.end();
  }
}