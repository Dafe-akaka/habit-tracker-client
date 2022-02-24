/**
* @jest-environment jsdom
*/

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { requestLogin, requestSignup, login, instantLogin } = require('../static/js/auth')

global.fetch = require('jest-fetch-mock');
//let api;
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

describe('api', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        // api = require('../static/js/api')
        // helper = require('../static/js/helpers')
    })

    afterEach(() => {
        fetch.resetMocks();
    });

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



                test('it logs in', () => {
                    
                    login(token);
                    expect(fetch.mock.calls.length).toEqual(1) 
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


