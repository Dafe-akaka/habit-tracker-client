/**
* @jest-environment jsdom
*/

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { getAllHabits, createHabit } = require("../static/js/requests");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({err: "true" }),
  })
);
describe('api', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
      })

    afterEach(() => {
        fetch.mockClear();
      })

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
