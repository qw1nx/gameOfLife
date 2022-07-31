const {expect} = require('chai');
const {getNeighborCount} = require('./app');

describe("Testing getNeighborCount", ()=> {
    it('Test invalid input', function () {
        expect(getNeighborCount(-1, -1)).to.be.equal(0);
        expect(getNeighborCount(-1, [])).to.be.equal(0);
        expect(getNeighborCount([], [])).to.be.equal(0);
        expect(getNeighborCount({}, {})).to.be.equal(0);
    });
})