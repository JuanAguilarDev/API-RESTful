const dao = require('../productosDao');

//import capa DAO

const getProductos = (done) => dao.getProductos(done);
const getProductoPorId = (idProducto, done) => dao.getProductoPorId(idProducto, done);
const guardarDetallesProducto = (detallesProducto, done) => dao.guardarDetallesProducto(detallesProducto, done);
const borrarProductoPorId = (idProducto, done) => dao.borrarProductoPorId(idProducto, done); 

module.exports = {
  getProductos, getProductoPorId, guardarDetallesProducto, borrarProductoPorId
}
