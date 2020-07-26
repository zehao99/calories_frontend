import {Button} from "antd";

const PortionTag = (props) =>{
  return <Button onClick = {props.onClickHandler.bind(this, props)}>{props.description + ' ' + props.amount+' '+props.unit}</Button>
}

export default PortionTag;