/**
 * @jest-environment jsdom
 */

 const fs = require("fs");
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

 const { renderRegisterForm, renderGraph } = require("../static/js/render");

 
 //global.fetch = require('jest-fetch-mock');

 const obj = {
    dates: [
      "2022-02-25T00:00:00.000Z",
      "2022-02-24T00:00:00.000Z",
      "2022-02-23T00:00:00.000Z",
      "2022-02-22T00:00:00.000Z",
      "2022-02-21T00:00:00.000Z",
      "2022-02-20T00:00:00.000Z",
      "2022-02-19T00:00:00.000Z",
    ],
    count: ["1", "9", "8", "8", "8", "0", "0"],
  }

 global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(obj),
  })
);

afterEach(() => {
    fetch.mockClear();
  })

 let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbiIsImVtYWlsIjoiam9uQGdtYWlsLmNvbSIsImlhdCI6MTY0NTYxNjAwMCwiZXhwIjoxNjQ1NzAyNDAwfQ.iJAMyx_lRCA4uDr2nSNpv8L084bCyW8V3423EHydJSk"

describe('api', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
     
    })

    // afterEach(() => {
    //     fetch.resetMocks();
    // });

    describe('auth', () => {
        
                test('renders registration', () => {
                    
                   expect(renderRegisterForm()).toEqual(undefined) 
                })


                test('renderGraph', async () => {

                    const getGraphData = jest.fn();

                      // Make the mock return `true` for the first call,
                       // and `false` for the second call
                       getGraphData.mockReturnValueOnce(obj)

                    let mockId = {
                        target: {
                                id: "1", 
                            }
                        }
                        const data = await renderGraph(mockId);
                        expect(fetch).toHaveBeenCalledTimes(1); //////////////MAGIC MAGIC ////////////////??????
                });

               
    })

});
