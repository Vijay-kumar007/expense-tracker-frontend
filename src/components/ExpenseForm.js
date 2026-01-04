import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onSubmit, editingExpense, onCancelEdit, loading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'FOOD',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
        date: editingExpense.date
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be positive');
      return;
    }

    const expenseData = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date
    };

    if (editingExpense) {
      onSubmit(editingExpense.id, expenseData);
    } else {
      onSubmit(expenseData);
    }

    // Reset form
    setFormData({
      amount: '',
      category: 'FOOD',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleCancel = () => {
    setFormData({
      amount: '',
      category: 'FOOD',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    onCancelEdit();
  };

  return (
    <div className="expense-form-container">
      <h2>{editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="FOOD">🍔 Food</option>
              <option value="TRANSPORT">🚗 Transport</option>
              <option value="RENT">🏠 Rent</option>
              <option value="OTHER">📦 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter expense description"
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (editingExpense ? 'Update Expense' : 'Add Expense')}
          </button>
          {editingExpense && (
            <button type="button" onClick={handleCancel} className="cancel-btn" disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;