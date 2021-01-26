import {Input} from 'antd';
import Router from "next/router";
import React from 'react';

const {Search} = Input;
type SearchBarProps = {
  value: string
}
const search = (keyword) => {
  if (keyword === "")
    return
  Router.push({
    pathname: '/search',
    query: {q: keyword},
  })
}

function SearchBar({value}: SearchBarProps) {
  return <Search
    defaultValue={value}
    enterButton="Search"
    size="large"
    onSearch={value => search(value)}
    style={{

      display: "flex !important",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "600px",
      margin: "20 auto important"
    }}
  />
}

export default React.memo(SearchBar);