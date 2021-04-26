import React from "react";
import "./card-styles.css";

export const Card = (props) => {
  return (
    <div className="card-container">
      <img
        alt={props.product.productName}
        src={props.product.productImage}
      ></img>
      <p>
        {props.product.productName} {props.product.price}
      </p>
    </div>
  );
};
