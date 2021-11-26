const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { communityDB, bannerDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;

  try {
    client = await db.connect(req);

    const getTag = await communityDB.getTag(client);
    const imgForiOS = await bannerDB.getBanneriOS(client);

    let tagList = [];
    for (let i = 0; i < getTag.length; i++) {
      tagList.push(getTag[i]['tagName']);
    }

    data = { tagList: tagList, image: imgForiOS[0]['image'] };

    // 존재 여부를 data:{ exist }에 담아서 return
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_MAIN_TAGS, data));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    // 서버 에러시 500 return
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
