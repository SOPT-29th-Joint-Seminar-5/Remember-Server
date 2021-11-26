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

const getCommunityId = async (client, tagName) => {
    const { rows } = await client.query(
      `
      SELECT id
      FROM community
      WHERE tag_name = $1
      `,
      [tagName]
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addPost = async (client, communityId, subject, contents) => {
    const { rows } = await client.query(
        `
        INSERT INTO post(community_id, subject, contents)
        VALUES($1, $2, $3)
        RETURNING *
        `,
        [communityId, subject, contents],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getPost, getCommunityId, addPost };
