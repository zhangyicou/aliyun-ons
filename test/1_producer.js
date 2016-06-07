/**
 * XadillaX created at 2015-12-19 23:29:10 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var should = require("should");

var config = require("./config");
var Producer = require("../").Producer;

describe("#producer", function() {
    var producer = new Producer(config.producerId, config.accessKey, config.secretKey);
    var date = new Date();

    this.timeout(0);

    it("should start producer", function(done) {
        producer.start(done);
    });

    it("should send an immediate message", function(done) {
        producer.send(
            config.topic,
            "tagA",
            "Hello " + date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate(),
            function(err, id) {
                should.ifError(err);
                id.should.match(/^[0-9A-Z]{32}$/);
                done();
            });
    });

    it("should send a timing message", function(done) {
        producer.send(
            config.topic,
            "tagA",
            "World " + date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate(),
            1000,
            function(err, id) {
                should.ifError(err);
                id.should.match(/^[0-9a-z]{32}$/);
                done();
            });
    });

    it("should stop producer", function(done) {
        producer.stop();
        done();
    });
});