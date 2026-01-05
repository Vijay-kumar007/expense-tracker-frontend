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

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch expenses');
    }
  };

  const handleAddExpense = async (data) => {
    try {
      await axios.post(API_URL, data);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  return (
    <div className="App">
      <ExpenseForm onSubmit={handleAddExpense} loading={loading} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
}

export default App;
