import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
} from "./Styles.js";

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action} onChange={props.onChange}>
      <StyledSelect id="services" name="services">
        {props.children}
      </StyledSelect>
    </DropdownWrapper>
  );
}

export function Option(props) {
  return <StyledOption  value={props.value} selected={props.selected}>{props.name}</StyledOption>;
}
