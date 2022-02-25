/**
* @jest-environment jsdom
*/

const fs = require("fs");
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const {login } = require('../static/js/auth')


global.fetch = require('jest-fetch-mock');

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

describe('api', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
     
    })

    afterEach(() => {
        fetch.resetMocks();
    });

    describe('auth', () => {
        
                test('it logs in', () => {
                    
                    login(token);
                    expect(fetch.mock.calls.length).toEqual(1) 
                })

               
    })
});


