const providerActions = require("./provider.actions");
function createResponse(statusCode, result) {
  return {
    statusCode,
    result
  };
}

const providerController = {
  saveProvider(req) {
    return new Promise((resolve, reject) => {
      providerActions
        .saveProvider(req.body)
        .then(response => resolve(createResponse(200, response)))
        .catch(error => reject(createResponse(500, error)));
    });
  }
};

module.exports = providerController;
