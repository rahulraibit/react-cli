var faker = require('faker');
fs = require('fs');

var formFillerScript = fs.readFileSync('../FormFiller/filler.js').toString();;

describe('CREATE SITE PAGE', function(){

		it('get all the textbox value and fill the data', function(){
			browser.get("http://localhost:3000/#/site?_k=2vgcex");
			browser.sleep(1000);
			browser.executeScript(formFillerScript, 'form-control').then(function(){
				console.log('filled form');
				browser.sleep(1000);
				element(by.css('[type="submit"]')).click();
			});
			browser.sleep(10000);
		});
	})
