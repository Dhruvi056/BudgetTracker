import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {useDispatch, useSelector } from 'react-redux';
import { showTask } from '../feacture/entriesSlice';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ExpenseChart = () => {
  const dispatch = useDispatch();
  
  const { users} = useSelector((state) => state.app); 
  useEffect(() => {
    dispatch(showTask());
  }, [dispatch]);
  console.log('Users:', users); 
  const entrie = users
 
  const expense = entrie?.filter((e) => e.type?.toLowerCase() === 'expense')
  console.log("expense",expense)
  console.log('Filtered Expenses:', expense);

  const expenseData = expense.reduce((acc, curr) => {
    const category = curr.category;
    console.log('Category:', category, 'Amount:', curr.amount); 
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += curr.amount;
    return acc;
  }, {});
  
  console.log('Expense Data:', expenseData); 

  const chartData = Object.keys(expenseData).map(category => ({
    name: category,
    value: expenseData[category],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
export default ExpenseChart;
