const mongoose = require("mongoose");
const request = require("request");
const Bicicleta = require("../../models/bicicleta");
const server = require("../../bin/www");
const base_url = "http://localhost:3000/api/bicicletas";

describe("Bicicleta API", () => {
  beforeAll((done) => {
    mongoose.connection.close(done);
  });
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

  describe("GET BICICLETAS", () => {
    it("Status 200", (done) => {
      request.get(base_url, function (error, response, body) {
        const result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.bicicletas.length).toBe(0);
        done();
      });
    });
  });

  describe("POST BICICLETAS /create", () => {
    it("STATUS 201", (done) => {
      const headers = { "content-type": "application/json" };
      const aBici =
        '{"code": 1, "color": "rojo", "modelo": "urbana", "lat": -61, "lon": -13}';
      request.post(
        {
          headers: headers,
          url: "http://localhost:3000/api/bicicletas/create",
          body: aBici,
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(201);
          Bicicleta.findByCode(1, function (error, targetBici) {
            expect(targetBici.code).toBe(1);
            expect(targetBici.color).toBe("rojo");
            expect(targetBici.modelo).toBe("urbana");
            done();
          });
        }
      );
    });
  });

  describe(" UPDATE BICILECTAS /update", () => {
    it("actualizar una bicicleta", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "roja", modelo: "bmx" });
      aBici.save((err, bici) => {
        if (err) console.log(err);
        Bicicleta.findOne({ _id: bici._id }, "code color  modelo").exec(
          (err, bicicleta) => {
            if (err) console.log(err);
            var headers = { "content-type": "application/json" };
            var abiciUpdate =
              '{ "code":1,"color":"Rojo","modelo":"Urbano","lat": "30.975832","lon": "-54.808815" }';
            request.post(
              {
                headers: headers,
                url: "http://localhost:3000/api/bicicletas/update",
                body: abiciUpdate,
              },
              function (error, response, body) {
                expect(response.statusCode).toBe(200);
                Bicicleta.findByCode(1, (err, bicicleta) => {
                  if (err) console.log(err);
                  expect(bicicleta.code).toBe(1);
                  done();
                });
              }
            );
          }
        );
      });
    });
  });

  describe("POST BICICLETAS /DELETE", () => {
    it("STATUS 204", (done) => {
      var a = Bicicleta.createInstance(1, "rojo", "urbana", [
        -24.6012424,
        -48.3861497,
      ]);
      var b = Bicicleta.createInstance(2, "blanca", "urbana", [
        -14.596932,
        -55.3808287,
      ]);

      Bicicleta.add(a);
      Bicicleta.add(b);

      var headers = { "content-type": "application/json" };
      var aBici = '{"code": 1}';

      request.delete(
        {
          headers: headers,
          url: "http://localhost:3000/api/bicicletas/delete",
          body: aBici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(404);
          Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(1);
          });
          done();
        }
      );
    });
  });
});
