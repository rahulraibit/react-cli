describe('USP INVENTORY PAGE', function(){
	it('should open the page', function(){
		browser.get("http://localhost:3000/#/?_k=xq9nym");
	});
	
	describe('checking the side bar toggling', function(){
		it('toggle functionality of sidebar',function(){
		 var togglebutton = element(by.css('.menu-toggle-2'));
		 togglebutton.click();
         expect(element(by.css('.toggled-2')).isPresent()).toBe(false);	
         browser.sleep(1000);		 
		 togglebutton.click();
         expect(element(by.css('.toggled-2')).isPresent()).toBe(true);		
		});
		
		
			it('checking the filter functionality', function(){
				   var items = element.all(by.css('.group-control-element [type="checkbox"]')).each(function(element, index) {
				   element.click();
				   browser.sleep(1000);
				   var rows = $$('griddle-body tbody tr');
				   expect(rows.count(), parseInt($(".filterPane h4").getText()));
				   element.click();
		
				   });
		
			});	
			
			it('checking for Status filter header toggling', function(){

				it('filter header toggling',function(){
				 var togglebutton = element(by.css('[data-target="#STATUS"]'));
				 togglebutton.click();
				 expect(element(by.css('.glyphicon-chevron-down')).isPresent()).toBe(true);	
				 browser.sleep(1000);		 
				 togglebutton.click();
				 expect(element(by.css('.glyphicon-chevron-down')).isPresent()).toBe(false);	
				});
		
			});	
			
			it('checking for SERIAL-NUMBER filter header toggling', function(){

				it('filter header toggling',function(){
				 var togglebutton = element(by.css('[data-target="#SERIAL-NUMBER"]'));
				 togglebutton.click();
				 expect(element(by.css('.glyphicon-chevron-down')).isPresent()).toBe(true);	
				 browser.sleep(1000);		 
				 togglebutton.click();
				 expect(element(by.css('glyphicon-chevron-down')).isPresent()).toBe(false);	
				});
		
			});	
			
			it('checking for DEVICES filter header toggling', function(){

				it('filter header toggling',function(){
				 var togglebutton = element(by.css('[data-target="#DEVICES"]'));
				 togglebutton.click();
				 expect(element(by.css('.glyphicon-chevron-down')).isPresent()).toBe(true);	
				 browser.sleep(1000);		 
				 togglebutton.click();
				 expect(element(by.css('.glyphicon-chevron-down')).isPresent()).toBe(false);	
				});
		
			});	

	})
})
   