import * as React from "react";
import Button from "react-bootstrap/Button";

function Button01(props) {
  return (
    <Button variant={props.variant} type={props.type} onClick={props.onClick}>
      {props.label}
    </Button>
  );
}

export default Button01;
