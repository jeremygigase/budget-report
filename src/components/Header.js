import React from "react";

const Header = ({ totalIncome, totalExpense, total }) => {
  return (
    <header>
      <h1>Budget Report</h1>
      <div className="total">Total €{total}</div>
    </header>
  );
};

export default Header;
