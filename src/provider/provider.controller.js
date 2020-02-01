const Provider = require('./provider.model');

const providerController = {}; // Objeto vazio

providerController.novo = async function(req, res) {
   try {
      await Provider.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

providerController.listar = async function(req, res) {
   try {
      const providers = await Provider.find().sort('-updatedAt');
      res.send(providers);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

providerController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const provider = await Provider.findById(id);
      if(provider) {    
         res.send(provider);
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

providerController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const provider = await Provider.findByIdAndUpdate(id, req.body);
      if(provider) {
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

providerController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const provider = await Provider.findByIdAndDelete(id);
      if(provider) {
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

module.exports = providerController;