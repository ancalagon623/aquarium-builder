import { useState } from 'react';
import PropTypes from 'prop-types';

const EditBuild = ({ build, categories }) => (
  <div>
    <div>Name</div>
    <div>{build.decscription}</div>
    <ul>
      {categories.map((c, i) => (
        <li key={i}>
          <h3>{c.name}</h3> <button type="button">+</button>
        </li>
      ))}
    </ul>
  </div>
);

export default EditBuild;

EditBuild.propTypes = {
  build: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};
