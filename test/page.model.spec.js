const { Page } = require("../models");
const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");
chai.should();
chai.use(require("chai-things"));
chai.use(spies);

describe("Page model", function () {
  describe("Virtuals", function () {
    let page;
    beforeEach(function () {
      page = Page.build();
    });
    describe("route", function () {
      it('devuelve el url_name anexado a "/wiki/"', function () {
        page.urlTitle = "Testing_mocha";
        expect(page.route).to.equal("/wiki/Testing_mocha");
      });
    });
    describe("renderedContent", function () {
      it("convierte el contenido formateado en Markdown a HTML", function () {
        page.content = "Testing mocha";
        expect(page.renderedContent).to.equal("<p>Testing mocha</p>\n");
      });
    });
  });

  describe("Class methods", function () {
    let page;
    beforeEach(function () {
      page = Page.create({
        title: "Testing mocha findbytag",
        content: "Testing mocha findbytag",
        tags: ["testing", "mocha", "findbytag"],
      });
    });
    describe("findByTag", function () {
      it("busca palabras por el tag de búsqueda", function () {
        Page.findByTag("testing").then((pages) => expect(pages).to.equal(page));
      });
      it("no trae páginas sin el tag de búsqueda", function () {
        Page.findByTag("hola").then((pages) => expect(pages).to.equal([]));
      });
      afterEach("force true", function () {
        Page.sync({ force: true });
      });
    });
  });

  describe("Instance methods", function () {
    let page;
    let page1;
    let page2;
    beforeEach(function () {
      page = Page.create({
        title: "Testing mocha findbytag",
        content: "Testing mocha findbytag",
        tags: ["testing", "mocha", "findbytag"],
      });
      page1 = Page.create({
        title: "Testing mocha findbytag",
        content: "Testing mocha findbytag",
        tags: ["testing", "mocha", "find"],
      });
      page2 = Page.create({
        title: "Testing mocha findbytag",
        content: "Testing mocha findbytag",
        tags: ["hola", "como", "estas"],
      });
    });

    describe("findSimilar", function () {
      it("nunca consigue a si misma", function () {
        Page.findByTag("findbytag").then((pageF) => {
          pageF
            .findSimilar()
            .then((pages) => expect(pages).should.not.include(page));
        });
      });

      it("consigue otras páginas con tags comunes", function () {
        Page.findByTag("findbytag").then((pageF) => {
          pageF
            .findSimilar()
            .then((pages) => expect(pages).should.include(page1));
        });
      });
      it("no consigue otras páginas sin tags comunes", function () {
        Page.findByTag("findbytag").then((pageF) => {
          pageF
            .findSimilar()
            .then((pages) => expect(pages).should.not.include(page2));
        });
      });
      afterEach("force true", function () {
        Page.sync({ force: true });
      });
    });
  });

  describe("Validations", function () {
    it("error sin title", function (done) {
      let page = Page.build({
        title: null,
        content: "holi",
      });

      page.validate().catch(function (err) {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal("title");
        done();
      });
    });

    it("error sin content", function (done) {
      let page = Page.build({
        title: "hola",
        content: null,
      });

      page.validate().catch(function (err) {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal("content");
        done();
      });
    });

    it("error con un status invalido", function (done) {
      Page.create({
        title: "hola",
        content: "Hola",
        status: "hola",
      })
        .then(() => done(new Error("Status ok")))
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });
    afterEach("force true", function () {
      Page.sync({ force: true });
    });
  });

  describe("Hooks", function (done) {
    xit("setea urlTitle basado en title antes de validar ", function (done) {
      /* Page.create({
        title: "Hola como estas",
        content: "holi",
      })
        .then((page) => {
          expect(page.urlTitle).to.exist;
          done();
        })
        .catch((err) => done(err)); */

      /* Page.build({
        title: "Hola como estas",
        content: "holi",
      },
      );
      console.log(Page.urlTitle);
      expect(Page.urlTitle).to.exist; */
    });
  });
});
