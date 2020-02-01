const Payment = require('./payment.model');

const paymentController = {}; // Objeto vazio

paymentController.novo = async function(req, res) {
   try {
      await Payment.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

paymentController.listar = async function(req, res) {
   try {
      const payments = await Payment.find().populate('id_customer');
      res.send(payments);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

paymentController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const payment = await Payment.findById(id).populate('id_customer');
      if(payment) {    
         res.send(payment);
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

paymentController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const payment = await Payment.findByIdAndUpdate(id, req.body);
      if(payment) {
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

paymentController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const payment = await Payment.findByIdAndDelete(id);
      if(payment) {
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

module.exports = paymentController;