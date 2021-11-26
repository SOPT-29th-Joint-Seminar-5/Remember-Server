const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  const { tagName, subject, contents } = req.body;

  if(!tagName) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  if(!subject) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  if(!contents) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

  let client;

  try {
    client = await db.connect(req);

    const communityId = await postDB.getCommunityId(client, tagName);
    console.log(communityId);

    // 태그 이름이 존재하지 않을 경우 400 return
    if(communityId === undefined){
        res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE, {
              tagName,
            }),
        );
    } else{
        const post = await postDB.addPost(client, communityId["id"], subject, contents);

        // 존재 여부를 data:{ exist }에 담아서 return
        res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.POST_POST, {
                post,
            }),
        );
    }
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    // 서버 에러시 500 return
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};