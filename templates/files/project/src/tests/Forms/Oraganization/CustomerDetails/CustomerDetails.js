var faker = require('faker');
fs = require('fs');

var formFillerScript = fs.readFileSync('../../FormFiller/filler.js').toString();;

describe('CUSTOMER DETAILS PAGE', function(){

		it('get all the textbox value and fill the data', function(){
			browser.get("http://localhost:3000/#/customer-details?orgId=Honeywell567-Alaska-Ketchikan-99901&orgName=Honeywell567&_k=7bj0ef");
			browser.sleep(1000);
			browser.executeScript(formFillerScript, 'form-control').then(function(){
				console.log('filled form');
				browser.sleep(1000);
			});
			browser.sleep(10000);
		});
	})
