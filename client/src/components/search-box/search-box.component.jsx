import React, { useEffect, useState } from "react";
import "./search-box.styles.css";

export const SearchBox = (props) => {
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    setTypeList(uniq(props.originalProductList.map((item) => item.type)));
  }, [props.category, props.originalProductList]);

  function uniq(a) {
    return Array.from(new Set(a));
  }

  return (
    <div className="filter-row">
      <div className="filter-column">
        <label htmlFor="search-product">
          <p className="label">Search your product</p>
          <input
            id="search-product"
            className="search"
            type="search"
            placeholder={props.placeholder}
            onChange={props.handleChange}
          />
        </label>
      </div>
      <div className="filter-column">
        <label htmlFor="filter">
          <p className="label">Filter by type</p>
          <select
            id="filter"
            value={props.category}
            className="filter"
            onChange={props.handleCategory}
            onBlur={props.handleCategory}
          >
            <option>Any</option>
            {typeList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
