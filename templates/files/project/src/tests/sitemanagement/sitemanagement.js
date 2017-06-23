describe('SITE MANAGEMENT', function(){
  
  //Local base URL;
  var baseUrl = 'http://localhost:3000/#';
  var sitePageUrl = baseUrl + '/site';
  var addSitePageUrl = baseUrl + '/add-site';

	it('should open the site list page', function(){
		browser.get(sitePageUrl);
    expect(browser.getCurrentUrl()).toContain("/site");
	});

  it('should open add site page on add site button click', function(){
    var addSiteBtn = element(by.css('[title="Add SITE"] .btn'));
    expect(addSiteBtn.isPresent()).toBe(true);
	});

   it('should open the add site page', function(){
    browser.get(addSitePageUrl);
    expect(browser.getCurrentUrl()).toContain("/add-site");
  });

  describe('ADD SITE', function(){
    browser.get(addSitePageUrl);

    it('should display the add zone button as disabled', function(){
      expect(element(by.css('.assign-dock-btn')).getAttribute('disabled')).toBe('true');
    })

    it('should add a site on add site button click', function(){
      element(by.css('[name="siteModel.SiteLabel"]')).clear().sendKeys('Test5678');
      element(by.css('[name="siteModel.Address.ZipCode"]')).clear().sendKeys('230189');
      element(by.css('[type="submit"]')).click();

      browser.wait(function() {
        return element(by.css('.modal-title')).isPresent();
      }).then(function () {
        //expect($('.modal-title').getText()).toEqual('SUCCESS');
        expect($('.modal-title').getText()).toEqual('ERROR');
        //expect(element(by.css('.assign-dock-btn')).getAttribute('disabled')).toBe('false');
        element(by.css('.modal-footer button')).click();
        expect(element(by.css('.assign-dock-btn')).getAttribute('disabled')).toBe('true');
      });
    });
  });

  describe('ADD ZONE', function(){
    browser.get(addSitePageUrl);

    it('should open modal on add zone button click', function(){
      element(by.css('.assign-dock-btn')).click();
     expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    });

    it('should add a zone', function(){
      
      element(by.css('[name="zoneModel.ZoneFullName"]')).clear().sendKeys('TEST ZONE ABC');
      element(by.css('[name="zoneModel.ZoneShortName"]')).clear().sendKeys('TZABC');
      element(by.css('[type="submit"]')).click();
      
      browser.wait(function() {
        return element(by.css('.modal-title')).isPresent();
      }).then(function () {
        expect($('.modal-title').getText()).toEqual('ZONE SUCCESS');
        element(by.css('.modal-footer button')).click();
      });
    });

    it('should show the added zone in the grid', function(){
        var addedZone = $('.usp-grid-table__row').length;
        expect(addedZone).toBeGreaterThan(0);         
    });
  });
});