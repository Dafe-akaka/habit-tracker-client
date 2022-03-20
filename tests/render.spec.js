/**
 * @jest-environment jsdom
 */

 //const fs = require("fs");
 //const path = require('path');
 //const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
 

 const {modalEvent} = require("../static/js/render");



 describe('render functions', () => {

    test('it logs in', () => {

        
    document.body.innerHTML = 
    '<div id="myModal" class="modal">'+
   ' <div class="modal-content">'+
    ' <header class="modal-header"><span class="close">&times;</span>'+
     '<h2 class="modalTitle">Habit Graph</h2>'+
      ' </header>'+
      '  <canvas id="myChart"> </canvas>'+
      '  </div>'+
   ' </div>' ;

   
    modalEvent();
     
 })

});
