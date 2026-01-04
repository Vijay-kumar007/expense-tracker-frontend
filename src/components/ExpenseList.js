import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="expense-list-container">
        <div className="loading">Loading expenses...</div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <div className="no-expenses">
          <p>📋 No expenses found</p>
          <p>Start by adding your first expense above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>💳 Your Expenses</h2>
      <div className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;