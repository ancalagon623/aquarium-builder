import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';

const initialFilter = {
  'lower-limit': '',
  'upper-limit': '',
  sort: '',
};

const Filters = ({ className, setEquipment }) => {
  const { currentCategory } = useSelector((state) => state.categories);
  const [filters, setFilters] = useState(initialFilter);
  const [showFilters, setShowFilters] = useState([]);

  const toggleFilterDropdown = (filterString) => {
    if (showFilters.includes(filterString)) {
      setShowFilters((state) => state.filter((str) => str !== filterString));
    } else {
      setShowFilters((state) => [...state, filterString]);
    }
  };

  const handleFiltersChange = (e) => {
    setFilters((state) => {
      if (['highest', 'lowest'].includes(e.target.id)) {
        return { ...state, sort: e.target.id };
      }
      return { ...state, [e.target.id]: e.target.value };
    });
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
    <div className={className}>
      <div>
        <label>
          <input
            type="text"
            placeholder="search for equipment..."
            onChange={(e) => {
              setFilters((state) => ({ ...state, search: e.target.value }));
            }}
          />
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
                  checked={filters.sort === 'highest'}
                  value="highest"
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
                  checked={filters.sort === 'lowest'}
                  value="lowest"
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
                setFilters(initialFilter);
                document.getElementById('lowest').checked = false;
                document.getElementById('highest').checked = false;
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
  className: PropTypes.string,
  setEquipment: PropTypes.func.isRequired,
};
