/**
* @jest-environment jsdom
*/

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { requestLogin, requestSignup, instantLogin } = require('../static/js/auth')

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({success: "true" }),
  })
);

describe('api', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
      })
      
      afterEach(() => {
        fetch.mockClear();
      })

    describe('auth', () => {
        
                test('it makes a login request', () => {
                    
                    const fakeSubmitEvent = {
                        preventDefault: jest.fn(),
                        target: {
                           email: {value: "bill@gmail.com"}, 
                           password: {value: "bill1"} 
                           }
                    };

                    requestLogin(fakeSubmitEvent);
                    expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                    expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({email: "bill@gmail.com", password: "bill1"}))
                })

                test('it makes an instant login request', () => {
                    
                    const fakeSubmitEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            Semail: {value: "bill@gmail.com"}, 
                            Spassword: {value: "bill1"} 
                           }
                    };

                    instantLogin(fakeSubmitEvent);
                    expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                    expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({email: "bill@gmail.com", password: "bill1"}))
                })

                test('it makes a sign up request', () => {
                    
                    const fakeSubmitEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            username: {value: "bill"},
                            Semail: {value: "bill@gmail.com"}, 
                            Spassword: {value: "bill1"} 
                           }
                    };

                    requestSignup(fakeSubmitEvent);
                    expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                    expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({username: "bill", email: "bill@gmail.com", password: "bill1"}))
                })
    })
});
