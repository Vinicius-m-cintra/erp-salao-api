const attendanceActions = require("./attendance.actions");
function createResponse(statusCode, result) {
  return {
    statusCode,
    result
  };
}

const attendanceController = {
  consultAttendances() {
    return new Promise((resolve, reject) => {
      attendanceActions
        .getAttendancess()
        .then(attendances => resolve(createResponse(200, attendances)))
        .catch(error => reject(createResponse(500, error)));
    });
  },
  findOneAttendance(id) {
    return new Promise((resolve, reject) => {
      attendanceActions
        .getOneAttendance(id)
        .then(attendance => {
          resolve(createResponse(200, attendance));
        })
        .catch(error => reject(createResponse(500, error)));
    });
  }
};

module.exports = attendanceController;
