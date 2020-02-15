const Attendance = require("./attendance.model");

const attendanceActions = {
  async getAttendancess() {
    let attendances = await Attendance.find();
    return attendances;
  },
  async getOneAttendance(id) {
    let attendance = await Attendance.findById(id);
    return attendance;
  }
};

module.exports = attendanceActions;
