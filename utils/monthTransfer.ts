import {css} from "next/dist/build/webpack/config/blocks/css";

export default function monthTransfer (month:string) {
  switch (month) {
    case "01" : return "Jan.";
    case "02" : return "Feb.";
    case "03" : return "Mar.";
    case "04" : return "Apr.";
    case "05" : return "May";
    case "06" : return "Jun.";
    case "07" : return "Jul.";
    case "08" : return "Aug.";
    case "09" : return "Sep.";
    case "10" : return "Oct.";
    case "11" : return "Nov.";
    case "12" : return "Dec.";
    default: return "N/A";
  }
}

export function dayTransfer(day: string) {
  const d = parseInt(day);
  switch (d) {
    case 1 : return "1st.";
    case 2 : return "2nd.";
    case 3 : return "3rd.";
    default: return d.toString() + "th.";
  }
}