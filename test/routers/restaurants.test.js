const request = require('supertest');
const express = require('express');
const  { RestaurantsRouter } = require('../../src/routers/restaurants');
const app = express();
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

app.use(RestaurantsRouter);

let RestaurantService;
let getAllRestaurantsStub;

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

        RestaurantService = proxyquire('../../src/services/restaurant-service/restaurant-service.js', 
            {
                getAllRestaurants: getAllRestaurantsStub,
            }
        );
    });

    describe('GET /test', () => {
        it('should return expected response', (done) => {
            request(app)
                .get('/test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /find/all', () => {
        it('should return expected response', (done) => {
            // Arrange
            getAllRestaurantsStub.resolves(fakeRestaurantResponse);
            // Act
            return request(app)
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