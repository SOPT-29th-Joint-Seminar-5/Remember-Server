const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getTag = async (client) => {
  const { rows } = await client.query(
    `
    SELECT tag_name FROM community
    `,
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getTag };
