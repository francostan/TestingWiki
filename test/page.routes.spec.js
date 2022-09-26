const supertest = require("supertest");
const app = require("../app");
const agent = supertest.agent(app);
const {Page} = require("../models");

describe("pedidos http", function () {
      
 describe("GET /wiki", function () {
    it("gets 200 en index", function (done) {
      agent.get("/wiki").expect(200, done);
    });
  });
  describe("GET /wiki/add", function () {
    it("responde con 200", function (done) {
        agent.get("/wiki/add").expect(200, done);
      });
  });

  describe("GET /wiki/:urlTitle", function () {

    beforeEach(function () {
        return Page.create({
            title: "hola",
            content: "holi",
            })
    });

    it("responde con 404 cuando la página no existe",function (done) {
        agent.get("wiki/holas").expect(404, done);
      });
    it("responde con 200 cuando la página existe",function (done) {
        agent.get("/wiki/hola").expect(200, done);
      });
    afterEach(function () {
        return Page.destroy({
            where: {
                title: "hola"
            }
        })
    });
  });

  describe("GET /wiki/search/:tag", function () {
    beforeEach(function () {
        return Page.create({
            title: "hola",
            content: "holi",
            tags: ["testing", "mocha", "findbytag"],
            })
    });

    it("responde con 200", function (done) {
        agent.get("/wiki/search/testing").expect(200, done);
  });

  afterEach(function () {
    return Page.destroy({
        where: {
            title: "hola"
        }
    })
});
});

  describe("GET /wiki/:urlTitle/similar", function () {
    beforeEach(function () {
        let page= Page.create({
            title: "hola",
            content: "holi",
            tags: ["testing", "mocha", "findbytag"],
            })
        let page1= Page.create({
            title: "hola1",
            content: "holi1",
            tags: ["testing", "mocha", "findbytag"],
            })
        let page2= Page.create({
            title: "hola2",
            content: "holi2",
            tags: ["testing", "mocha", "findbytag"],
        })
        return {page, page1, page2};
    });
    it("responde con 404 cuando la página no existe", function (done) {
        agent.get("/wiki/holas/similar").expect(404, done);
    });

    it("responde con 200 para páginas similares", function (done) {
        agent.get("/wiki/hola/similar").expect(200, done);
    });
    afterEach(function () {
        Page.destroy({
            where: {}
        })
    });
  });

  describe("POST /wiki", function () {
    it("responde con 302");
    it("crea una page en la base de datos");
  });
});
