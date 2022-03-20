/**
* @jest-environment jsdom
*/

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { deleteHabit, updateHabit, getGraphData } = require("../static/js/render");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({err : "false" }),
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

        describe('post requests', () => {

            test('it makes a post request', () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                       id: {value: 2}, 
                       }
                };

                deleteHabit(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'DELETE');
            })
        })

        test('it updates an habit', () => {
              
            const fakeSubmitEvent = {
                preventDefault: jest.fn(),
                target: {
                   id: {value: 2}, 
                   }
            };

            updateHabit(fakeSubmitEvent);
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({habit_id: {value: 2}, username: null}))
        })

        test('it gets data to render a graph', () => {
              
            getGraphData(1);
            //expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'GET');
            expect(fetch.mock.calls[0][0]).toContain('http://localhost:3000/habits/graphdata/1')
        })


    })

})
