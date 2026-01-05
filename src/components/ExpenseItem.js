import React from "react";
import "./ExpenseItem.css";

const ExpenseItem = ({ expense, onDelete }) => {
  if (!expense) return null;

  const amount = Number(expense.amount || 0);
  const date = expense.date
    ? new Date(expense.date).toLocaleDateString()
    : "No date";

  return (
    <div className="expense-item">
      <div>
        <strong>{expense.description || "No description"}</strong>
        <div>{expense.category || "OTHER"}</div>
        <small>{date}</small>
      </div>

      <div className="right">
        <span>${amount.toFixed(2)}</span>
        <button onClick={() => onDelete(expense.id)}>🗑</button>
      </div>
    </div>
  );
};

export default ExpenseItem;
