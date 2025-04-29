import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showTask } from '../feacture/entriesSlice'; 
import { useNavigate } from 'react-router-dom';

const FilteredEntriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.app);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  const categories = [...new Set(users?.map((user) => user.category))];

  useEffect(() => {
    dispatch(showTask());
  }, [dispatch]);

  useEffect(() => {
    let entries = users;

    if (selectedCategory) {
      entries = entries.filter((user) => user.category === selectedCategory);
    }

    if (startDate) {
      entries = entries.filter((user) => new Date(user.date) >= new Date(startDate));
    }

    if (endDate) {
      entries = entries.filter((user) => new Date(user.date) <= new Date(endDate));
    }

    setFilteredEntries(entries);
  }, [selectedCategory, startDate, endDate, users]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
    <h2 style={{ color: 'rgb(49, 1, 66)', textAlign: 'center'  ,padding:'20px' }}>
  Filtered Entries
</h2>


      <div className="row justify-content-center mb-4 gap-3">
      
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        {filteredEntries && filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="col-md-6 col-lg-5 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-capitalize fw-semibold">{entry.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Type: {entry.type}</h6>
                  <p className="mb-1"><strong>Amount:</strong> ₹{entry.amount}</p>
                  <p className="mb-1"><strong>Category:</strong> {entry.category}</p>
                  <p className="mb-1"><strong>Date:</strong> {entry.date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No entries found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredEntriesPage;
