var utils = require('../FormFiller/commonMethods.js');

describe('Add Manual Device PAGE', function(){
	describe('checking the functionality', function(){
		it('get all the textbox value and fill the data', function(){
			browser.get("http://localhost:3000/#/?_k=rvl96z");
			browser.sleep(1000);
			element(by.css('[type="button"]')).click();
      var DeviceCategory = $('select[name="formFieldValues.apiKeyFields.Device.DeviceCategory"]');
      DeviceCategory.click();
      utils.selectDropdownbyNum(DeviceCategory, 2);
      browser.sleep(1000);
      var ProductFamily = $('select[name="formFieldValues.apiKeyFields.Device.ProductFamily"]');
      ProductFamily.click();
      //expect(utils.DropdownOptionsCount(ProductFamily)).toEqual(1);
      browser.sleep(1000);

      DeviceCategory.click();
      utils.selectDropdownbyNum(DeviceCategory, 1);
      browser.sleep(1000);
      ProductFamily.click();
      //expect(utils.DropdownOptionsCount(ProductFamily)).toEqual(2);
      browser.sleep(1000);

      utils.selectDropdownbyNum(ProductFamily, 1);
      browser.sleep(1000);

      var SiteIdUri = $('select[name="formFieldValues.apiKeyFields.Device.SiteIdUri"]');
      utils.selectDropdownbyNum(SiteIdUri, 2);
      browser.sleep(1000);

      element(by.css('input[name="formFieldValues.apiKeyFields.Device.SerialNumber"]')).sendKeys("ABCDEFGI5621");
      browser.sleep(1000);
      element(by.css('[type="submit"]')).click();
		});
	})
});
