import React from "react";
import Item from "./Item";

const List = ({ incExp, setIncExp, price }) => {
  const removeItem = (i) => {
    let temp = incExp.filter((v, index) => index !== i);
    setIncExp(temp);
  };

  const sortByDate = (a, b) => {
    return a.date - b.date;
  };

  return (
    <div className="list">
      {incExp.sort(sortByDate).map((value, index) => (
        <Item
          key={index}
          income={value}
          index={index}
          removeIncome={removeItem}
          price={price}
        />
      ))}
    </div>
  );
};

export default List;
