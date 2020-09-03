const mongoose = require("mongoose");
const Bicicleta = require("../../models/bicicleta");

describe("Testing Bicicletas", () => {
  beforeAll((done) => { mongoose.connection.close(done) });
  beforeEach(() => {
    const mongoDB = "mongodb://localhost:27017/testdb";
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("We are connected to test databese!");
    });
  });
  afterEach((done) => {
    Bicicleta.deleteMany({}, (err, success) => {
      if (err) console.log(err);
      done();
    });
  });

  describe("Bicicleta.createInstance", () => {
    it("crea una instancia de Bicicleta", () => {
      const bici = Bicicleta.createInstance(1, "verde", "urbana", [
        -34.5,
        -54.1,
      ]);
      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toBe(-34.5);
      expect(bici.ubicacion[1]).toBe(-54.1);
    });
  });

  describe("Bicicleta.allBicis", () => {
    it("comienza vacia", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe("Bicicleta.add", () => {
    it("agrega solo una bici", (done) => {
      const aBici = new Bicicleta({
        code: 1,
        color: "verde",
        modelo: "urbana",
      });
      Bicicleta.add(aBici, function (err, newBici) {
        if (err) console.log(err);
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);
          done();
        });
      });
    });
  });

  describe("Bicicleta.findByCode", () => {
    it("debe devolver la bici con code 1", (done) => {
      Bicicleta.allBicis((err, bicis) => {
        expect(bicis.length).toBe(0);
        const aBici = new Bicicleta({
          code: 1,
          color: "verde",
          modelo: "urbana",
        });
        Bicicleta.add(aBici, (err, newBici) => {
          if (err) console.log(err);
            Bicicleta.findByCode(1, (error, targetBici) => {
                if(error) console.log(error);
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);
              done();
            });
          });
        });
      });
    });
  });