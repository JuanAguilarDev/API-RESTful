const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");

describe("Probando API Productos", function () {
  it("Probando API get Prodcutos", function (done) {
    supertest(app)
      .get("/api/v1/productos/")
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.equal(null);
        expect(err).to.equal(null);
        expect(res.body).to.be.an("object");
        expect(res.body.STATUS).to.equal("OK");
        expect(res.body.data[0].nombre).to.be.equal("Monitor LED ");
         expect(res.body.data[1].nombre).to.be.equal("Refri");
         expect(res.body.data[2].nombre).to.be.equal("Mouse Optico");
         expect(res.body.data[3].nombre).to.be.equal("Teclado Inalambrico");
        done(err);
      });
  });

  it("Probando API get producto con idProducto valido", function (done) {
    supertest(app)
      .get("/api/v1/productos/3")
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.STATUS).to.equal("OK");
        expect(res.body.data.id).to.be.equal(3);
        expect(res.body.data.nombre).to.be.equal("Mouse Optico");
        expect(res.body.data.precio).to.be.equal(25);
        expect(res.body.data.cantidad).to.be.equal(1);
        done(err);
      });
  });


  it("Probando API guardar producto", function (done) {
    let nuevoProducto = {
    "nombre": "Lavadora",
      "descripcion": "Para lavar ropa",
      "precio": 10000,
      "cantidad": 10
    }

    supertest(app)
      .post("/api/v1/productos/")
      .send(nuevoProducto)
      .expect(201)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.body).to.be.an("object");
        expect(res.body.STATUS).to.equal("OK");
        expect(res.body.data.nombre).to.equal(nuevoProducto.nombre);
        expect(res.body.data.price).to.be.equal(nuevoProducto.precio);
        done(err);
      });
  });

 
});