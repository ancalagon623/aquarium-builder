import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Filters = ({ setEquipment }) => {
  const { currentCategory } = useSelector((state) => state.categories);
  const [filters, setFilters] = useState({
    'lower-limit': '',
    'upper-limit': '',
    highest: '',
    lowest: '',
  });
  const [showFilters, setShowFilters] = useState([]);

  const toggleFilterDropdown = (filterString) => {
    if (showFilters.includes(filterString)) {
      setShowFilters((state) => state.filter((str) => str !== filterString));
    } else {
      setShowFilters((state) => [...state, filterString]);
    }
  };

  const handleFiltersChange = (e) => {
    setFilters((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const filterEquipment = async () => {
    const options = {
      params: filters,
    };

    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/categories/${currentCategory}/equipment`,
        options
      );

      if (status === 200) {
        setEquipment(data);
      }
    } catch (err) {
      return null;
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="text"
            placeholder="search for equipment..."
            onChange={(e) => {
              setFilters((state) => ({ ...state, search: e.target.value }));
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              if (filters.search) {
                // make a filtered request for equipment
              }
            }}
          >
            Search
          </button>
        </label>
      </div>
      <div>
        Filter By Price
        <button
          type="button"
          onClick={() => {
            toggleFilterDropdown('price');
          }}
        >
          {showFilters.includes('price') ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        {showFilters.includes('price') ? (
          <ul>
            {/* <li>
              <label>
                None
                <input
                  type="radio"
                  id="none"
                  name="price-filter"
                  onChange={handleFiltersChange}
                />
              </label>
            </li> */}
            <li>
              <label>
                Highest to Lowest
                <input
                  type="radio"
                  id="highest"
                  value={filters.highest}
                  name="price-filter"
                  onChange={handleFiltersChange}
                />
              </label>
            </li>
            <li>
              <label>
                Lowest to Highest
                <input
                  type="radio"
                  id="lowest"
                  value={filters.lowest}
                  name="price-filter"
                  onChange={handleFiltersChange}
                />
              </label>
            </li>
            <li>
              <label>
                Greater than:
                <span>$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.00"
                  id="lower-limit"
                  value={filters['lower-limit']}
                  onChange={handleFiltersChange}
                />
              </label>
            </li>
            <li>
              <label>
                Less than:
                <span>$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.00"
                  value={filters['upper-limit']}
                  id="upper-limit"
                  onChange={handleFiltersChange}
                />
              </label>
            </li>

            <button
              type="button"
              onClick={() => {
                setFilters({
                  'lower-limit': '',
                  'upper-limit': '',
                  highest: '',
                  lowest: '',
                });
              }}
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => {
                filterEquipment();
              }}
            >
              Filter
            </button>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  setEquipment: PropTypes.func.isRequired,
};
