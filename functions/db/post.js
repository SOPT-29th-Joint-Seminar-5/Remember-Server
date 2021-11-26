const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getPost = async (client, postId) => {
  const { rows } = await client.query(
    `
    SELECT c.tag_name, p.subject, p.nickname, p.duty, p.contents, p.comment_cnt, p.like_cnt
    FROM post AS p, community AS c
    WHERE p.id = $1
    AND p.community_id = c.id
    `,
    [postId]
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getPost };
