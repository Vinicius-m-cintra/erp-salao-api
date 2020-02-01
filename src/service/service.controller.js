const Service = require('./service.model');

const serviceController = {}; // Objeto vazio

serviceController.novo = async function(req, res) {
   try {
      await Service.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

serviceController.listar = async function(req, res) {
   try {
      const services = await Service.find();
      res.send(services);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

serviceController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const service = await Service.findById(id);
      if(service) {    
         res.send(service);
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

serviceController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const service = await Service.findByIdAndUpdate(id, req.body);
      if(service) {
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

serviceController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const service = await Service.findByIdAndDelete(id);
      if(service) {
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

module.exports = serviceController;