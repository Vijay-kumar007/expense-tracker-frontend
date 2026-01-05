import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = ({ expenses = [], onDelete }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p style={{ textAlign: "center" }}>No expenses found</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
