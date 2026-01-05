import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/expenses`;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch failed", err);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (!e) return false;

      if (filterCategory !== "ALL" && e.category !== filterCategory) {
        return false;
      }

      if (filterMonth && filterYear && e.date) {
        const d = new Date(e.date);
        return (
          d.getMonth() + 1 === Number(filterMonth) &&
          d.getFullYear() === Number(filterYear)
        );
      }

      return true;
    });
  }, [expenses, filterCategory, filterMonth, filterYear]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce(
      (sum, e) => sum + Number(e?.amount || 0),
      0
    );
  }, [filteredExpenses]);

  const addExpense = async (data) => {
    setLoading(true);
    try {
      const payload = {
        amount: Number(data.amount),
        category: data.category,
        description: data.description || "",
        date: data.date,
      };

      await axios.post(API_URL, payload);
      await fetchExpenses();
    } catch (err) {
      console.error("Add failed", err);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete expense?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  return (
    <div className="App">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses</p>
      </header>

      <ExpenseForm onSubmit={addExpense} loading={loading} />

      <section className="filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="ALL">All</option>
          <option value="FOOD">Food</option>
          <option value="TRANSPORT">Transport</option>
          <option value="RENT">Rent</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          placeholder="MM"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <input
          placeholder="YYYY"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        />
      </section>

      <section className="summary">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <p>{filteredExpenses.length} expense(s)</p>
      </section>

      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
