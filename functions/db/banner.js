const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getBanneriOS = async (client) => {
  const { rows } = await client.query(
    `
    SELECT image FROM banner
    WHERE id = 1
    `,
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

const getBannerAndroid = async (client) => {
  const { rows } = await client.query(
    `
      SELECT image FROM banner
      WHERE id = 2
      `,
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getBanneriOS, getBannerAndroid };
