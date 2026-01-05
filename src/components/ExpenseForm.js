import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "FOOD",
    description: "",
    date: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return alert("Amount & date required");
    onSubmit(form);
    setForm({ amount: "", category: "FOOD", description: "", date: "" });
  };

  return (
    <form className="expense-form" onSubmit={submit}>
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="FOOD">Food</option>
        <option value="TRANSPORT">Transport</option>
        <option value="RENT">Rent</option>
        <option value="OTHER">Other</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
