import { useState } from 'react';
import styled from 'styled-components';
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
      {/* <div>
        <label>
          <input
            type="text"
            placeholder="search for equipment..."
            onChange={(e) => {
              setFilters((state) => ({ ...state, search: e.target.value }));
            }}
          />
        </label>
      </div> */}
      <Section>
        <DropdownButton
          type="button"
          onClick={() => {
            toggleFilterDropdown('price');
          }}
        >
          {showFilters.includes('price') ? <FaCaretDown /> : <FaCaretRight />}
        </DropdownButton>
        <SectionTitle>Filter By Price</SectionTitle>
        {showFilters.includes('price') ? (
          <FilterCriteria>
            <li>
              <StyledInput
                type="radio"
                id="highest"
                checked={filters.sort === 'highest'}
                value="highest"
                name="price-filter"
                onChange={handleFiltersChange}
              />
              <label htmlFor="highest">Highest to Lowest</label>
            </li>
            <li>
              <StyledInput
                type="radio"
                id="lowest"
                checked={filters.sort === 'lowest'}
                value="lowest"
                name="price-filter"
                onChange={handleFiltersChange}
              />
              <label htmlFor="lowest">Lowest to Highest</label>
            </li>
            <li>
              <Label htmlFor="lower-limit">Greater than:</Label>
              <span>$</span>
              <StyledInput
                type="number"
                step="0.01"
                min="0.00"
                id="lower-limit"
                name="lower-limit"
                value={filters['lower-limit']}
                onChange={handleFiltersChange}
              />
            </li>
            <li>
              <Label htmlFor="upper-limit">Less than:</Label>
              <span>$</span>
              <StyledInput
                name="upper-limit"
                type="number"
                step="0.01"
                min="0.00"
                value={filters['upper-limit']}
                id="upper-limit"
                onChange={handleFiltersChange}
              />
            </li>

            <Buttons>
              <FilterButton
                type="button"
                onClick={() => {
                  setFilters(initialFilter);
                  document.getElementById('lowest').checked = false;
                  document.getElementById('highest').checked = false;
                }}
              >
                Clear All
              </FilterButton>
              <FilterButton
                type="button"
                onClick={() => {
                  filterEquipment();
                }}
              >
                Filter
              </FilterButton>
            </Buttons>
          </FilterCriteria>
        ) : null}
      </Section>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  className: PropTypes.string,
  setEquipment: PropTypes.func.isRequired,
};

const Section = styled.div`
  margin: 10px;
  position: relative;
  text-align: left;
`;

const SectionTitle = styled.div`
  display: inline-block;
  font-weight: 700;
  margin-left: 20px;
`;

const FilterCriteria = styled.ul`
  list-style: none;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  padding-left: 12px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: left;
  gap: 10px;
`;

const FilterButton = styled.button`
  width: fit-content;
  align-self: center;
`;

const DropdownButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 2px;
`;

const StyledInput = styled.input`
  display: inline;
  margin-left: 5px;
`;
