import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSubmit, loading }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("FOOD");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date) {
      alert("Amount and date are required");
      return;
    }

    onSubmit({
      amount: Number(amount),        // ✅ number
      category,                       // ✅ enum-safe
      description: description || "", // ✅ never null
      date                            // ✅ YYYY-MM-DD
    });

    setAmount("");
    setCategory("FOOD");
    setDescription("");
    setDate("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="FOOD">Food</option>
        <option value="TRANSPORT">Transport</option>
        <option value="RENT">Rent</option>
        <option value="OTHER">Other</option>
      </select>

      <input
        type="date"          // 🔥 DO NOT CHANGE THIS
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
