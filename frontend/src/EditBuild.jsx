import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { getCategories } from './reducers/actions';

const EditBuild = () => {
  const build = useSelector((state) => state.builds.currentBuild);
  const { list } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!list.length) {
      dispatch(getCategories());
    }
  }, []);

  const goToEquipmentInCategory = (categoryName) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: categoryName });
    navigate('/builds/edit/add-equipment');
  };

  return (
    <div>
      <div>{build.name} - Add Equipment</div>
      <div>{build.decscription}</div>
      <ul>
        {list.map((c, i) => (
          <li key={i}>
            <CategoryName>
              {c.type}{' '}
              <AddEqButton
                type="button"
                onClick={() => {
                  goToEquipmentInCategory(c.type);
                }}
              >
                +
              </AddEqButton>
            </CategoryName>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditBuild;

// EditBuild.propTypes = {
//   build: PropTypes.object.isRequired,
//   categories: PropTypes.object.isRequired,
// };

const CategoryItem = styled.li``;

const CategoryName = styled.h3`
  position: relative;
`;

const AddEqButton = styled.button`
  position: absolute;
  right: 20%;
`;
