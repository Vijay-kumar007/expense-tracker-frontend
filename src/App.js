import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/expenses`;


function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, filterCategory, filterMonth, filterYear]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];

    if (filterCategory !== 'ALL') {
      filtered = filtered.filter(exp => exp.category === filterCategory);
    }

    if (filterMonth && filterYear) {
      filtered = filtered.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() + 1 === parseInt(filterMonth) && 
               expDate.getFullYear() === parseInt(filterYear);
      });
    }

    setFilteredExpenses(filtered);
    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    setTotalAmount(total);
  };

  const handleAddExpense = async (expenseData) => {
    setLoading(true);
    try {
      await axios.post(API_URL, expenseData);
      fetchExpenses();
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${id}`, expenseData);
      fetchExpenses();
      setEditingExpense(null);
      alert('Expense updated successfully!');
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
      alert('Expense deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const clearFilters = () => {
    setFilterCategory('ALL');
    setFilterMonth('');
    setFilterYear('');
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>💰 Expense Tracker</h1>
          <p>Track your daily expenses with ease</p>
        </header>

        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          editingExpense={editingExpense}
          onCancelEdit={handleCancelEdit}
          loading={loading}
        />

        <div className="filters-section">
          <h2>Filter Expenses</h2>
          <div className="filters">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Categories</option>
                <option value="FOOD">Food</option>
                <option value="TRANSPORT">Transport</option>
                <option value="RENT">Rent</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Month:</label>
              <input
                type="number"
                min="1"
                max="12"
                placeholder="MM"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Year:</label>
              <input
                type="number"
                min="2000"
                max="2100"
                placeholder="YYYY"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-input"
              />
            </div>

            <button onClick={clearFilters} className="clear-btn">
              Clear Filters
            </button>
          </div>

          <div className="total-section">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <p>{filteredExpenses.length} expense(s) found</p>
          </div>
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;