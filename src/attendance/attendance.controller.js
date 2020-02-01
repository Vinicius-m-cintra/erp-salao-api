const Attendance = require('./attendance.model');

const attendanceController = {}; // Objeto vazio

attendanceController.novo = async function(req, res) {
   try {
      await Attendance.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

attendanceController.listar = async function(req, res) {
   try {
      const attendances = await Attendance.find().populate('id_customer').populate('spents');
      res.send(attendances);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

attendanceController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const attendance = await Attendance.findById(id).populate('id_customer').populate('spents');
      if(attendance) {    
         res.send(attendance);
      }
      else {      
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

attendanceController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const attendance = await Attendance.findByIdAndUpdate(id, req.body);
      if(attendance) {
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

attendanceController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const attendance = await Attendance.findByIdAndDelete(id);
      if(attendance) {
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

module.exports = attendanceController;