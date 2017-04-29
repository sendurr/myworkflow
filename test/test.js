/*"use strict";

 var expect = require('chai').expect;

 // Simple assertions
 expect({}).to.exist;
 expect(28).to.equal(26);
 expect(false).to.be.false;
 expect('hello').to.be.string;

 // Modifiers ('not')
 expect([1, 2, 3]).to.not.be.empty;

 // Complex chains
 expect([1, 2, 3]).to.have.length.of.at.least(3);*/

 //During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block


describe('/GET Users',function() {
    it('should list ALL users on /users GET', function(done) {
        chai.request(server)
            .get('/users')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
});


