var faker = require('faker');
fs = require('fs');

var formFillerScript = fs.readFileSync('../../FormFiller/filler.js').toString();;

describe('CUSTOMER LIST PAGE', function(){

		it('get the list of all organizations', function(){
			browser.get("http://localhost:3000/#/customer-list?_k=yh1zst");
			browser.sleep(10000);
		});
	})
