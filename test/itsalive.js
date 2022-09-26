const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
describe ("Testeo 1 mocha", function() {
    it("suma",function(){
        expect(2+2).to.equal(4);
    })
});

describe("Testeo 2 async ", function() {
    it("testeo async", function(done) {
        const inicio= new Date()
        setTimeout(function(){
            const fin= new Date()
            expect(fin-inicio).to.be.at.least(1000);
            done();
        }, 1000);});
});

describe("Testeo 3 spy",function (){
    it("testeo spy", function(){
        let array = [1,2,3,4,5];
        function consol(a){
            console.log(a);
        }
        let spy = chai.spy(consol);
        array.forEach(a => spy(a));
        expect(spy).to.have.been.called.exactly(5);
    })
})