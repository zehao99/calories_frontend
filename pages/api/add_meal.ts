
import {ParseMealToID} from "../../utils/parseMeal"
import {stringify} from "querystring";

const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT;

export default async (req, res) => {
  let date = new Date();
  function format (date, fmt) {
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
  let today_date = format(date,"yyyy-MM-dd");

  let reqBody = JSON.parse(req.body);
  console.log(reqBody);
  let meal_id = ParseMealToID(reqBody["currentMeal"]);
  let url = new URL(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/add_meal`)
  let params = {
    "date": today_date.toString(),
    "meal_id": meal_id.toString(),
    "fdc_id": reqBody["fdc_id"].toString(),
    "amount": reqBody["amount"].toString()
  }
  const formData = new URLSearchParams();
  for(let key in params){
    formData.append(key.toString(), params[key]);
  }
  console.log(params);
  // url.search = new URLSearchParams(params).toString();
  const response = await fetch(url.toString(), {
    method: "POST",
    credentials: "include",
    headers: {
      "cookie": req.headers.cookie,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formData.toString(),
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