import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './reducers/actions';

const EditBuild = () => {
  const build = useSelector((state) => state.builds.currentBuild);
  const { list, equipmentByCategory } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!list.length) {
      dispatch(getCategories());
    }
  }, []);

  return (
    <div>
      <div>Name</div>
      <div>{build.decscription}</div>
      <ul>
        {list.map((c, i) => (
          <li key={i}>
            <h3>{c.type}</h3> <button type="button">+</button>
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
