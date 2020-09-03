let mongoose = require("mongoose");
let Bicicleta = require("../../models/bicicleta");
let Usuario = require("../../models/usuario");
let Reserva = require("../../models/reserva");

describe("Testing Usuario", () => {
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
        Reserva.deleteMany({}, (err, success) => {
            if (err) console.log(err);
            Usuario.deleteMany({}, (err, success) => {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, (err, success) => {
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });
    describe("Cuando un usuario reserva una bici", () => {
        it("debe existir la reserva", (done) => {
            var usuario = new Usuario({
                nombre: "Erik"
            });
            usuario.save();
            const bicicleta = new Bicicleta({
                code: 1,
                color: "azul",
                modelo: "bmx",
            });
            bicicleta.save();

            const hoy = new Date();
            const manana = new Date();
            manana.setDate(hoy.getDate() + 1);

            usuario.reservar(bicicleta.id, hoy, manana, function (err, reserva) {
                Reserva.allReservas({}).populate('usuario').populate('bicicleta').exec((err, reservas) => {
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    done();
                });
            });
        });
    });
});