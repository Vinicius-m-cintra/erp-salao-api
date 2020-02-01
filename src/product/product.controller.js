const Product = require('./product.model');

const productController = {}; // Objeto vazio

productController.novo = async function(req, res) {
   try {
      await Product.create(req.body);
      
      res.status(200).json({ ok: true });
   }
   catch(erro) {
      console.error(erro);
        
      res.sendStatus(500).end();
   }
}

productController.listar = async function(req, res) {
   try {
      const products = await Product.find().populate('id_provider');
      res.send(products);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

productController.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const product = await Product.findById(id).populate('id_provider');
      if(product) {    
         res.send(product);
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

productController.atualizar = async function(req, res) {
   const id = req.params._id;
   try {
      const product = await Product.findByIdAndUpdate(id, req.body);
      if(product) {
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

productController.excluir = async function(req, res) {
   const id = req.params._id;
   try {
      const product = await Product.findByIdAndDelete(id);
      if(product) {
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

module.exports = productController;