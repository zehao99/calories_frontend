import {Button} from "antd";
import styles from "./PortionTag.module.scss";

const PortionTag = (props) => {
  let description = props.description;
  if (description.length > 10) description = description.substr(0, 10) + "...";
  return <Button onClick={props.onClickHandler.bind(this, props)}
                 className={styles.portionTags}>{description + ' ' + props.amount + ' ' + props.unit}</Button>
}

export default PortionTag;