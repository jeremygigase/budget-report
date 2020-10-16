import React from "react";

import cleanupDate from "../helpers/cleanupDate";

const Item = ({ income, index, removeIncome, price }) => {
  const removeHandle = (i) => {
    removeIncome(i);
  };

  console.log(price);

  return (
    <div className="item">
      <button className="remove-item" onClick={() => removeHandle(index)}>
        x
      </button>
      <div className="desc">{income.desc}</div>
      {price === "income" ? (
        <div className="price">€{income.income}</div>
      ) : (
        <div className="price">€{income.expense}</div>
      )}

      <div className="date">{cleanupDate(income.date)}</div>
    </div>
  );
};

export default Item;
