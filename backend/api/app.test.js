const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('./app.js')

const should = chai.should();
chai.use(chaiHttp);

describe("Matkakohde haku", () => {
  describe("Matkakohteet", () => {
    it("Pitäisi löytyä kaikki matkakohteet", (done) => {
      chai.request(app).get("/api/destinations").end((error, result) => {
        should.exist(result.body);
        done(error);
      });
    });
  });

  describe("Yksittäinen matkakohde", () => {
    it("Pitäisi löytyä yksittäinen matkakohde", (done) => {
      chai.request(app).get("/api/destinations/1").end((error, result) => {
        should.exist(result.body);
        done(error);
      });
    });
  });
});
    describe("Käyttäjät", () => {
      it("Pitäisi löytyä kaikki käyttäjät", (done) => {
        chai.request(app).get("/api/users").end((error, result) => {
          should.exist(result.body);
          done(error);
        });
    });
  
    describe("Yksittäinen käyttäjä", () => {
      it("Pitäisi löytyä yksittäinen käyttäjä", (done) => {
        chai.request(app).get("/api/users/1").end((error, result) => {
          should.exist(result.body);
          done(error);
        });
      });
    });
  });
  describe("Matkakertomus", () => {
      it("Pitäisi löytyä yksittäinen matkakertomus", (done) => {
        chai.request(app).get("/api/stories/1").end((error, result) => {
          should.exist(result.body);
          done(error);
        });
      });
});
describe("Tarina", () => {
    it("Pitäisi löytyä yksittäinen tarina", (done) => {
      chai.request(app).get("/api/journeys/1").end((error, result) => {
        should.exist(result.body);
        done(error);
      });
    });
});
describe("Kuva", () => {
    it("Pitäisi löytyä yksittäinen kuva", (done) => {
      chai.request(app).get("/api/pictures/9").end((error, result) => {
        should.exist(result.body);
        console.log(result.body)
        done(error);
      });
    });
});

