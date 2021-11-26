const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getMain = async (client) => {
  const { rows } = await client.query(
    `
    SELECT p.id, p.subject, c.tag_name, p.comment_cnt, p.like_cnt
    FROM post p JOIN community c
        on p.community_id = c.id
    `,
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getMain };
