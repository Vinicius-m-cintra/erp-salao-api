const Attendance = require('./attendance.model');

const formatResponse = require('../common/formatResponse');

const attendanceActions = {
  async saveAttendance(data) {
    try {
      await Attendance.create(data);
      return 'Atendimento cadastrado com sucesso';
    } catch (error) {
      return error;
    }
  },
  async findAll(params) {
    const limit = parseInt(params.limit, {}) || 10;
    const offset = params.offset || 0;

    try {
      const attendances = await Attendance.find()
        .populate('customer')
        .limit(limit)
        .skip(limit * offset);
      return formatResponse(attendances, { limit, offset });
    } catch (error) {
      return error;
    }
  },
  async findOne(id) {
    try {
      const attendance = await Attendance.findById(id);
      return attendance;
    } catch (error) {
      return error;
    }
  },
  async editAttendance(req) {
    try {
      const attendance = await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return attendance;
    } catch (error) {
      return error;
    }
  },
  async deleteAttendance(id) {
    try {
      const attendance = await Attendance.findByIdAndDelete(id);
      return attendance;
    } catch (error) {
      return error;
    }
  },
};

module.exports = attendanceActions;
