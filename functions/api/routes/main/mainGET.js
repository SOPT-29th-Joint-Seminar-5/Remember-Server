const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { mainDB, bannerDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;

  try {
    client = await db.connect(req);

    const mainData = await mainDB.getMain(client);
    const imgForAndroid = await bannerDB.getBannerAndroid(client);

    data = { mainList: mainData, image: imgForAndroid[0]['image'] };

    // 존재 여부를 data:{ exist }에 담아서 return
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_MAIN_DATA, data));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    // 서버 에러시 500 return
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
