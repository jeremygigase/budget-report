import React, { useState, useEffect } from "react";

// Components
import Header from "./components/Header";
import IncExpForm from "./components/IncExpForm";
import List from "./components/List";

// Helpers
import cleanupDate from "./helpers/cleanupDate";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const [total, setTotal] = useState(0);
  const [showIncome, setShowIncome] = useState(true);

  const [showStats, setShowStats] = useState(false);

  const [data, setData] = useState([]);

  function sumIncValuesGroupByDate(input) {
    let dates = {};
    input.forEach(
      (dv) => (dates[dv.date] = (dates[dv.date] || 0) + parseInt(dv.income))
    );
    return Object.keys(dates).map((date) => ({ date, income: dates[date] }));
  }

  function sumExpValuesGroupByDate(input) {
    let dates = {};
    input.forEach(
      (dv) => (dates[dv.date] = (dates[dv.date] || 0) + parseInt(dv.expense))
    );
    return Object.keys(dates).map((date) => ({ date, expense: dates[date] }));
  }

  const groupByDate = (array) =>
    array.reduce((results, item) => {
      const current = results.find((i) => i.date === item.date);
      if (current) {
        for (let property in item) {
          if (property !== "date") {
            current[property] = item[property];
          }
        }
      } else {
        results.push({ ...item });
      }
      return results;
    }, []);

  useEffect(() => {
    let tempIn = 0;
    let tempEx = 0;
    for (let i = 0; i < income.length; i++) {
      /*sometimes comes through as a string */
      tempIn += parseInt(income[i].income);
    }

    for (let i = 0; i < expense.length; i++) {
      /*sometimes comes through as a string */
      tempEx += parseInt(expense[i].expense);
    }
    setTotal(tempIn - tempEx);
    setTotalIncome(tempIn);
    setTotalExpense(tempEx);

    setData(
      groupByDate(
        sumIncValuesGroupByDate(income).concat(sumExpValuesGroupByDate(expense))
      ).map((d) => {
        const copy = { ...d, date: cleanupDate(Date.parse(d.date)) };
        return copy;
      })
    );

    console.log(
      groupByDate(
        sumIncValuesGroupByDate(income).concat(sumExpValuesGroupByDate(expense))
      ).map((d) => {
        const copy = { ...d, date: cleanupDate(d.date) };
        return copy;
      })
    );
  }, [income, expense]);

  return (
    <div className="App">
      <Header
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        total={total}
      />

      <div className="buttons">
        <div
          className="total stats-button"
          onClick={() => {
            setShowStats((curShowStats) => !curShowStats);
          }}
          style={{ cursor: "pointer" }}
        >
          Statistics
        </div>
      </div>
      {showStats ? (
        <div className="stats-container">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#06d6a0" />
              <Bar dataKey="expense" fill="#ef476f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="stats-container closed"></div>
      )}

      <div className="buttons">
        <div
          className="total income-button"
          onClick={() => {
            setShowIncome(true);
          }}
          style={{ cursor: "pointer" }}
        >
          Income €{totalIncome}
        </div>
        <div
          className="total expense-button"
          onClick={() => {
            setShowIncome(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Expenses €{totalExpense}
        </div>
      </div>

      {showIncome ? (
        <div className="income-container">
          <IncExpForm
            incExp={income}
            setIncExp={setIncome}
            placeholderDesc="Income Description..."
            placeholderInput="Add Income"
            priceName="income"
          />
          <List incExp={income} setIncExp={setIncome} price="income" />
        </div>
      ) : (
        <div className="expense-container">
          <IncExpForm
            incExp={expense}
            setIncExp={setExpense}
            placeholderDesc="Expense Description..."
            placeholderInput="Add Expense"
            priceName="expense"
          />
          <List incExp={expense} setIncExp={setExpense} price="expense" />
        </div>
      )}
    </div>
  );
}

export default App;
