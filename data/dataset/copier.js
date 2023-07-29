/*global describe, it, before, beforeEach, after, afterEach*/

'use strict';


var request = require('supertest'),
    testutil = require('../util');


describe('plugins:copier', function () {


    after(function () {
        testutil.cleanUp();
    });


    it('copies static files', function (done) {
        var app = testutil.createApp({
            copier: {
                module: './plugins/copier',
                files: '**/*'
            }
        });

        request(app)
            .get('/img/nyan.jpg')
            .expect(200)
            .end(done);
    });


    it('copies nested static files', function (done) {
        var app = testutil.createApp({
            copier: {
                module: './plugins/copier',
                files: '**/*'
            }
        });

        request(app)
            .get('/img/wow/nyan.jpg')
            .expect(200)
            .end(done);
    });


    it('Copies files with no extension', function (done) {
        var app = testutil.createApp({
            copier: {
                module: './plugins/copier',
                files: '**/*'
            }
        });

        request(app)
            .get('/img/altfile')
            .expect(200)
            .end(done);
    });


    it('Ignores missing files', function (done) {
        var app = testutil.createApp({
            copier: {
                module: './plugins/copier',
                files: '**/*'
            }
        });

        request(app)
            .get('/img/batboy.jpg')
            .expect(404)
            .end(done);
    });


});