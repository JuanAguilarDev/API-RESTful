
//importar el modulo fs
const dir = require('path');
const fs = require('fs');
const path = dir.join(__dirname, './data/producto.json');

// Verificar productos
(() => {
  try{
    if(!fs.existsSync(path)) fs.writeFileSync(path, '[]');
  }catch(err){
    throw new Error(err);
  }
  console.log('Todo listo'.rainbow);
})();


// Products 

const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));

//La funcion  getProductos toma done como callback
//Este leera el archivo productos.json


const getProductos = function(done){
  if(productos.length > 0){
    try{
      return done(undefined, productos);
    }catch(err){
      return done(err);
    }
  }
  throw new Error('Los productos no fueron encontrados')
}

// La funcion getProductoPorId requiere dos parametros el primero es el id y el segundo el callback
// Este leerá el archivo producto.json



const getProductoPorId = function(idProducto, done){
  const producto = productos.filter(prod => prod.id == idProducto);
  if(producto.length > 0){
    try{
      return done(undefined, producto);
    }catch(err){
      return done(err);
    }
  }
  throw new Error(`El producto con el id: ${idProducto}, no fue encontrado.`);    
}

// el metodo guardarDetallesProducto tomara detallesProducto y done como callback
// este leerá el archivo producto.json

const guardarDetallesProducto = function (detallesProducto, done) {
  const id = productos.length+1;
    const productoNuevo = {
      id,
      nombre: detallesProducto.nombre,
      descripcion: detallesProducto.descripcion,
      precio: detallesProducto.precio,
      cantidad: detallesProducto.cantidad
    }
    try{
      productos.push(productoNuevo); 
      fs.writeFileSync(path, JSON.stringify(productos)); 
      return done(undefined, productos);
    }catch(err){
      return done(err);
    }
    
  }

  // El metodo borrarProductoPorId toma dos parametros idProducto y done
  // Este leerá el archivo producto.json

  

  const borrarProductoPorId = function(idProducto, done){
    let index = productos.findIndex(prod => prod.id == idProducto);
    if(index == -1){
        throw new Error(`El elemento con el id: ${idProducto} no existe. `);
    }else{
      try{
        let data = productos.filter(prod => prod.id != idProducto);
        fs.writeFileSync(path, JSON.stringify(data));
        return done(undefined, data);
      } catch(err){
        return done(err);
      }
    }
  }


module.exports = {
    getProductos,
    getProductoPorId,
    guardarDetallesProducto,
    borrarProductoPorId
    
}