const sql = {};

sql.dropTables = (tables) => {
  if (tables === undefined) {
    return `
      DROP TABLE IF EXISTS app_users, bld_eq, builds, equipment CASCADE;
    `;
  }

  return `
    DROP TABLE IF EXISTS ${tables} CASCADE;
  `;
};

sql.createUsersTable = () => `
CREATE TABLE app_users (
    user_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name varchar,
    username varchar,
    password varchar,
    password_temp varchar,
    image_url varchar,
    joineddate timestamp DEFAULT CURRENT_DATE
);`;

sql.createBuildsTable = () => `
  CREATE TABLE builds (
    bld_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    bld_name varchar,
    bld_description varchar,
    price int,
    user_id int REFERENCES app_users (user_id)
  );
`;

sql.createEquipmentTable = () => `
  CREATE TABLE equipment (
    eq_id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    eq_name VARCHAR,
    seller VARCHAR,
    seller_site VARCHAR,
    type VARCHAR,
    price VARCHAR,
    img_url VARCHAR,
    link VARCHAR
  );
`;

sql.createJunctionTable = () => `
  CREATE TABLE bld_eq (
    bld_id INT REFERENCES builds (bld_id),
    eq_id INT REFERENCES equipment (eq_id)
  )
`;

sql.insertOneUser = (values) => ({
  text: `
  INSERT INTO "app_users" (name, username, password, password_temp)
    VALUES ($1, $2, $3, $4) 
    RETURNING user_id;
  `,
  values,
});

sql.oneUser = (username) => ({
  text: `
      SELECT * FROM app_users WHERE username = $1;
    `,
  values: [username],
});

sql.userById = (id) => ({
  text: `
      SELECT * FROM app_users WHERE user_id = $1;
    `,
  values: [id],
});

sql.addOneEquipment = (e) => `
    INSERT INTO equipment (eq_name, link, img_url, seller, seller_site, type, price)
      VALUES ('${e.eq_name}', '${e.link}', '${e.img_url}', '${e.seller}', '${e.seller_site}', '${e.type}', '${e.price}');
  `;

sql.addEquipment = (equipmentArray) => {
  const strings = equipmentArray.map(
    (e) =>
      `('${e.eq_name.replace("'", "''")}', '${e.link}', '${e.img_url}', '${
        e.seller
      }', '${e.seller_site}', '${e.type.replace("'", "''")}', '${e.price}')`
  );
  return `
    INSERT INTO equipment (eq_name, link, img_url, seller, seller_site, type, price)
      VALUES ${strings};
  `;
};

// eslint-disable-next-line camelcase
sql.newBuild = (buildInfo, user_id) => ({
  text: `
      INSERT INTO builds (bld_name, bld_description, user_id)
      VALUES ($1, $2, $3) RETURNING *;
    `,
  // eslint-disable-next-line camelcase
  values: [buildInfo.name, buildInfo.description || null, user_id],
});

sql.getBuildById = (id) => ({
  text: `
      SELECT * FROM builds
      WHERE bld_id = $1;
    `,
  values: [id],
});

sql.getBuildsByUserId = (id) => ({
  text: `
    SELECT * FROM builds
    WHERE user_id = $1;
    `,
  values: [id],
});

sql.updatePrice = (buildId, price) => ({
  text: `
      UPDATE builds
      SET price = $2
      WHERE bld_id = $1 RETURNING *;
    `,
  values: [buildId, price],
});

sql.getAllCategories = () => `
  SELECT DISTINCT type FROM equipment;
`;

sql.getEquipmentInCategory = (categoryName) => ({
  text: `
      SELECT * FROM equipment
      WHERE type = $1;
    `,
  values: [categoryName],
});

sql.addEquipmentToBuild = (equipmentId, buildId) => ({
  text: `
      INSERT INTO bld_eq (eq_id, bld_id)
      VALUES ($1, $2) RETURNING *;
    `,
  values: [equipmentId, buildId],
});

sql.getEquipmentInBuild = (buildId) => ({
  text: `
      SELECT * FROM 
      bld_eq NATURAL JOIN equipment
      WHERE bld_eq.bld_id = $1;
    `,
  values: [buildId],
});

module.exports = sql;
