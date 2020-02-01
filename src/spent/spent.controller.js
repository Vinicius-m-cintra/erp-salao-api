const Spent = require('./spent.model');

const spentController = {}; // Objeto vazio

spentController.novo = async function(req, res) {
   try {
      await Spent.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

spentController.listar = async function(req, res) {
   try {
      const spents = await Spent.find();
      res.send(spents);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

spentController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const spent = await Spent.findById(id);
      if(spent) {    
         res.send(spent);
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

spentController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const spent = await Spent.findByIdAndUpdate(id, req.body);
      if(spent) {
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

spentController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const spent = await Spent.findByIdAndDelete(id);
      if(spent) {
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

module.exports = spentController;