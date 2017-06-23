// Method to select the custom index in dropdown

exports.selectDropdownbyNum = function ( element, index ) {
  if (index){
    var options = element.all(by.tagName('option'))
      .then(function(options){
        options[index].click();
      });
  }
};

exports.DropdownOptionsCount = function ( element) {
  var i;
  if (element){
    options = element.all(by.tagName('option')).then(function(options){
      i = options.length;
      console.log(i);
    })
  }
  return i;
};
