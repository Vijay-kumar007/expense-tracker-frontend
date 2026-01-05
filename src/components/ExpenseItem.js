import React from 'react';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      FOOD: '🍔',
      TRANSPORT: '🚗',
      RENT: '🏠',
      OTHER: '📦',
    };
    return icons[category] || '📦';
  };

  const getCategoryColor = (category) => {
    const colors = {
      FOOD: '#4CAF50',
      TRANSPORT: '#2196F3',
      RENT: '#FF9800',
      OTHER: '#9C27B0',
    };
    return colors[category] || '#9C27B0';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const safeAmount = Number(expense?.amount ?? 0).toFixed(2);

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div
          className="expense-category"
          style={{ color: getCategoryColor(expense?.category) }}
        >
          <span className="category-icon">
            {getCategoryIcon(expense?.category)}
          </span>
          <span className="category-name">
            {expense?.category || 'OTHER'}
          </span>
        </div>

        <div className="expense-details">
          <p className="expense-description">
            {expense?.description || 'No description'}
          </p>
          <p className="expense-date">
            📅 {formatDate(expense?.date)}
          </p>
        </div>
      </div>

      <div className="expense-actions">
        <div className="expense-amount">
          ${safeAmount}
        </div>

        <div className="action-buttons">
          <button
            onClick={() => onEdit(expense)}
            className="edit-btn"
            title="Edit"
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(expense?.id)}
            className="delete-btn"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
