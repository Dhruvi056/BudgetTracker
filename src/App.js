import React from 'react';
import Navbar from './componets/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Create from './componets/create';
import Read from './componets/read';
import Drawers from './componets/drawers';
import ExpenseChart from './componets/chart'
import Dasbord from '../src/componets/Dasbord';
import FilteredEntriesPage from './componets/filter'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dasbord />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/listing" element={<Read />} />
          <Route exact path="/edit/:id" element={<Drawers />} /> 
          <Route exact path="/chart" element={<ExpenseChart />} />
          <Route exact path="/filtered-entries" element={<FilteredEntriesPage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
