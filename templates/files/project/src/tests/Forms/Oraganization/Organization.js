var faker = require('faker');
fs = require('fs');

var formFillerScript = fs.readFileSync('../FormFiller/filler.js').toString();;

describe('CREATE ORGANIZATION PAGE', function(){
	// iit('should open the page', function(){
	// 	browser.get("http://localhost:3000/#/customer?_k=ny7aie");
	// });

	describe('checking the side bar toggling', function(){
		// iit('toggle functionality of sidebar',function(){
		// 	var togglebutton = element(by.css('.menu-toggle-2'));
		// 	togglebutton.click();
		// 	expect(element(by.css('.toggled-2')).isPresent()).toBe(false);
		// 	browser.sleep(1000);
		// 	togglebutton.click();
		// 	expect(element(by.css('.toggled-2')).isPresent()).toBe(true);
		// });


		it('get all the textbox value and fill the data', function(){
			browser.get("http://localhost:3000/#/customer?_k=ny7aie");
			browser.sleep(1000);
			console.log(formFillerScript);
			browser.executeScript(formFillerScript, 'form-control').then(function(){
				console.log('filled form');
				browser.sleep(1000);
				element(by.css('[type="submit"]')).click();
			});
			browser.sleep(10000);
		});
	})
})
