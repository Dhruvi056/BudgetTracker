import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const allentries = useSelector((state)=>state.app.users);
  const dispatch =useDispatch();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link to="/" className="nav-link">
                Dasbord
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Add Entries
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listing" className="nav-link">
                All Entries
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chart" className="nav-link">
                Charts
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/filtered-entries" className="nav-link">
                View Filtered Entries
              </Link>
</li>

          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              //value={searchData}
              //onChange={(e)=>(setSearchData(e.target.value))}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
