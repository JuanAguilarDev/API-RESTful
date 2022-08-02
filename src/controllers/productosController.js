const productosServicio = require('../services/productosService');

// importar el productosServicio
const getProductos = (done) => productosServicio.getProductos(done);
const getProductoPorId = (idProducto, done) => productosServicio.getProductoPorId(idProducto, done);
const guardarDetallesProducto = (detallesProducto, done) => productosServicio.guardarDetallesProducto(detallesProducto, done);
const borrarProductoPorId = (idProducto, done) => productosServicio.borrarProductoPorId(idProducto, done);


module.exports = {
  getProductos, getProductoPorId, guardarDetallesProducto, borrarProductoPorId
}
