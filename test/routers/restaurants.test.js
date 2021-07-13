const request = require('supertest');
const express = require('express');
const RestaurantsRouter = require('../../src/routers/restaurants');
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

let RestaurantService;
let getAllRestaurantsStub;
let app;

const fakeRestaurantResponse = [
    {
        name: 'FakeRestaurant',
        building: '1234',
        street: 'Main Street',
        borough: 'FakeBorough',
        coordinates: [-12.3456789, 98.7654321],
        cuisineType: 'Pangolian',
        grades: [
            { createDate: Date.now(), grade: 'X+', score: -1 }
        ],
    }
];

describe('RestaurantsRouter', () => {

    beforeEach(() => {
        getAllRestaurantsStub = sinon.stub();

        RestaurantService = {
            getAllRestaurants: getAllRestaurantsStub,
        };

        app = express();
        app.use(RestaurantsRouter(RestaurantService));
    });

    afterEach(() => {
        app = null;
    })

    describe('GET /test', () => {
        it('should return expected response when succeeds', (done) => {
            request(app)
                .get('/test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /find/all', () => {
        it('should return expected response when succeeds', (done) => {
            // Arrange
            getAllRestaurantsStub.resolves(fakeRestaurantResponse);
            // Act
            request(app)
                .get('/find/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    // Assert
                    assert.deepEqual(res.body, fakeRestaurantResponse);
                    done();
                })
                .catch(err => {
                    done(err);
                });       
        });
    });
});