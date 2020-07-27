import {Button} from "antd";

const PortionTag = (props) =>{
  return <Button key={props.key} onClick = {props.onClickHandler.bind(this, props)}>{props.description + ' ' + props.amount+' '+props.unit}</Button>
}

export default PortionTag;