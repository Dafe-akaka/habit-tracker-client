/**
* @jest-environment jsdom
*/
const { getAllHabits, createHabit } = require("../static/js/requests");

global.fetch = require('jest-fetch-mock');

describe('api', () => {

    afterEach(() => {
        fetch.resetMocks();
    });

    describe('requests', () => {

        describe('get requests ', () => {

            test('it makes a get request', () => {
                getAllHabits();
                expect(fetch.mock.calls.length).toEqual(1) 
                expect(fetch.mock.calls[0][0]).toContain('habits/habits')
            })
        });

        describe('post requests', () => {

            test('it makes a post request', () => {
                
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                       frequency: {value: 10}, 
                       habit: {value: "running"} 
                       }
                };

                createHabit(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({habit: "running", frequency: 10}))
            })
        })

    })

})
