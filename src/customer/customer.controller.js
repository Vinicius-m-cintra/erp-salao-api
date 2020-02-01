const Customer = require('./customer.model');

const customerController = {}; // Objeto vazio

customerController.novo = async function(req, res) {
   try {
      await Customer.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

customerController.listar = async function(req, res) {
   try {
      const customers = await Customer.find().populate('id_provider');
      res.send(customers);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

customerController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const customer = await Customer.findById(id).populate('id_provider');
      if(customer) {    
         res.send(customer);
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

customerController.atualizar = async function(req, res) {
   const id = req.params.id;
   try {
      const customer = await Customer.findByIdAndUpdate(id, req.body);
      if(customer) {
         res.sendStatus(204).json({ message: "Cadastro atualizado" });
      }
      else {
         res.sendStatus(404).json({ message: "Cadastro não encontrado" });
      }
   }
   catch(erro) {
      console.error("caiu aqui", erro);
      res.sendStatus(500).end();
   }
}

customerController.excluir = async function(req, res) {
   const id = req.params.id;
   try {
      const customer = await Customer.findByIdAndDelete(id);
      if(customer) {
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

module.exports = customerController;