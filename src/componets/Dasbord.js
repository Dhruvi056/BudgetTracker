import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showTask } from '../feacture/entriesSlice'; // adjust path if needed

const Dasbord = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);
  const entrie = users
  //console.log(entrie,"22")
 


const income = entrie?.filter((e) => e.type?.toLowerCase() === 'income')
  .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

const expense = entrie?.filter((e) => e.type?.toLowerCase() === 'expense')
  .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

const balance = income - expense;

  useEffect(() => {
    dispatch(showTask());
  }, [dispatch]);



  if (loading) {
    return <p>Loading Dashboard...</p>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.header}>Personal Budget Tracker</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Income</h3>
          <p style={styles.amount}>${income.toFixed(2)}</p>
          <div style={styles.icon}>💰</div>
        </div>

        <div style={styles.card}>
          <h3>Total Expenses</h3>
          <p style={styles.amount}>${expense.toFixed(2)}</p>
          <div style={styles.icon}>💸</div>
        </div>

        <div style={styles.card}>
          <h3>Current Balance</h3>
          <p style={styles.amount}>${expense.toFixed(2)}</p>
          <div style={styles.icon}>📊</div>
        </div>
      </div>
    </div>
  );
};

const styles = {

    dashboardContainer: {
      padding: '20px',
      textAlign: 'center',
      backgroundColor: 'rgb(244, 222, 252)',
      minHeight: '100vh',
    },
 
  header: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: '32px',
    marginBottom: '30px',
    textTransform: 'uppercase',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  amount: {
    fontSize: '28px',
    color: '#2ecc71',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  icon: {
    fontSize: '50px',
    marginTop: '15px',
    color: '#3498db',
  },
};

export default Dasbord;
