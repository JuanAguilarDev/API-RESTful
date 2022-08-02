const router = require('express').Router();
const productosController = require('../controllers/productosController');


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
    console.log(idProducto);
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
    req
    .on('data', (chunk) =>{
      detallesProducto = JSON.parse(chunk.toString());
      productosController.guardarDetallesProducto(detallesProducto, (err, result)=>{
        if(err){
          return handlerError(res, 500);
        }
        res.status(200).send(result);
      })
    })
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
