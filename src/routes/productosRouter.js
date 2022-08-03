const productosController = require('../controllers/productosController');
const {Router} = require('express');
const router = Router();

function handlerError(res, code){
  res.statusCode = code;
  res.end(`{"Error: "} ${http.STATUS_CODES[code]}`);
}

router.get("/", (req, res) => {
  try {
    productosController.getProductos((err, results) => {
      if(err){
        return handlerError(res, 500);
      }
      res.status(200).send(results);
      
    });
    
  } catch (err) {
    return handlerError(res, 400); 
  }
});

// Este metodo obtendra el producto con el idProducto dado desde producto.json
router.get("/:idProducto", (req, res) => {
  try {
    // obtener el idproducto desde el req.params
    const {idProducto} = req.params; 
      productosController.getProductoPorId(idProducto, (err, result)=>{
      if(err){
        return handlerError(res, 500);
      }
        res.status(200).send(result);
      });
  } catch (err) {
    return handlerError(res, 400);
  }
});



router.post("/", (req, res) => {
  try {
    let detallesProducto = {};
    console.log(req.body);
    detallesProducto = req.body;
    productosController.guardarDetallesProducto(detallesProducto, (err, result)=>{
      if(err){
        return handlerError(res, 500);
      }
      res.status(201).send(result);
    });
    
    
  } catch (err) {
      return handlerError(res, 400);
  }
});




router.delete("/:idProducto", (req, res) => {
  try {
    const {idProducto} = req.params;
    productosController.borrarProductoPorId(idProducto, (err, results) => {
      if(err){
        handlerError(res, 500);
      }  
      res.status(200).send(results);
    });

  } catch (err) {
     return handlerError(res, 400);
  }
});

module.exports = router;
