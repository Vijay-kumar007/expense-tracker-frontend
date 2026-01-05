import React from 'react';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, onDelete }) => {
  const amount = Number(expense.amount || 0).toFixed(2);
  const description = expense.description || 'No description';
  const date = expense.date
    ? new Date(expense.date).toLocaleDateString()
    : 'No date';
  const category = expense.category || 'OTHER';

  return (
    <div className="expense-item">
      <div>
        <strong>{description}</strong>
        <div>{category}</div>
        <small>{date}</small>
      </div>

      <div>
        <strong>${amount}</strong>
        <button onClick={() => onDelete(expense.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default ExpenseItem;
