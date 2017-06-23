
var getRandom = function(values) {
	var index = Math.floor((Math.random() * (values.length - 1)) + 0);
	return values[index];
};

var faker = {
	lorem: {
		text: function() { return getRandom(["John", "Anthony"]);},
		paragraph: function() {return getRandom(["Hsr layout, Sec - 2 "]);}
	},
	phone: {
		phoneNumber: function() {return getRandom([1234567890, 8928928918]);}
	},
	address: {
		zipCode: function() {return getRandom([560102, 322337, 127827]);}
	},
	internet: {
		email: function() {return getRandom(['test@gmail.com', 'test2@yahoo.com', 'test3@gmail.com'])},
		url: function() {return getRandom(['http://mywebsite.com', 'http://yourwebsite.com']);}
	},
	organisation: {
		name: function() { return getRandom(['HoneyWell', 'Google', 'IBM', 'CISCO']);}
	},
	city: {
		name: function() { return getRandom(['Bangalore', 'Mumbai', 'Chennai', 'Hydrabad']);}
	},
	PurchaseOrder: {
		name: function() { return getRandom(['PO12345', 'PO23458', 'PO78956', 'PO56213']);}
	},
	Designation: {
		name: function() { return getRandom(['Manager', 'Software Developer', 'Supervisor', 'Technician']);}
	},
	Department: {
		name: function() { return getRandom(['IT', 'Marketing', 'Technical', 'Non Technical']);}
	}

};

Element.prototype.getAttributes = function() {
    return (function (node) {
        var attrs = {};
        for (var i=0;i<node.length;i++) {
            attrs[node.item(i).name] = node.item(i).value;
        }
        return attrs;
    })(this.attributes);
};

var fillInput = function(element, answer) {
	element.value = answer;
};

var selectOption = function(element, index) {
	var selectedIndex = index !== undefined ? index : Math.floor((Math.random() * (element.options.length - 1)) + 1);
	element.selectedIndex = selectedIndex;
};

var getAllFieldTypes = function() {

	var input = {
		predicate: function(element, tagName, attrs) {
			return tagName === 'INPUT';
		},
		answer: function(element,  answer) {
			fillInput(element,  faker.lorem.text());
		}
	};

	var select = {
		predicate: function(element, tagName, attrs) {
			return tagName === 'SELECT';
		},
		answer: function(element, answer) {
			selectOption(element, answer);
		}
	};

	var textarea = {
		predicate: function(element, tagName, attrs) {
		return tagName === 'TEXTAREA';
	   },
	   answer: function(element,  answer) {
		 fillInput(element,  faker.lorem.paragraph());
	   }
    };

	var checkbox = function(element, tagName, attrs) {
		return tagName === 'CHECKBOX';
	};

	var radio = function(element, tagName, attrs) {
		return tagName === 'RADIO';
	};

	var phone = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && element.type.toUpperCase() === 'TEL';
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.phone.phoneNumber());
		}
	};

	var postalCode = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('postalcode');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.address.zipCode());
		}
	};

	var email = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && element.type.toUpperCase() === 'EMAIL';
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.internet.email());
		}
	};

	var url = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && element.type.toUpperCase() === 'URL';
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.internet.url());
		}
	};

	var organization = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('organizationname');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.organisation.name());
		}
	};

	var city = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('city');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.city.name());
		}
	};

	var PurchaseOrder = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('purchaseorder');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.PurchaseOrder.name());
		}
	};

	var Designation = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('designation');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.Designation.name());
		}
	};

	var Department = {
		predicate: function(element, tagName, attrs) {
			return input.predicate(element, tagName, attrs) && attrs.name.toLowerCase().endsWith('department');
		},
		answer: function(element, tagName, attrs) {
			fillInput(element,  faker.Department.name());
		}
	};
	return [email, url, phone, postalCode, city, organization, PurchaseOrder, Designation, Department, input, textarea, select];
};

var fillAnswer = function(element) {
    var attrs = element.getAttributes(),
    tagName = element.tagName,
    fieldTypes = getAllFieldTypes();
    for(i=0, len=fieldTypes.length; i < len; i++) {
        var fieldType = fieldTypes[i];
        if(fieldType.predicate(element, tagName.toUpperCase(), attrs)){
            fieldType.answer(element);
            break;
        }
    }
};

var fillAllAnswers = function(elements) {
    for(var i=0, len=elements.length; i<len; i++) {
        fillAnswer(elements[i]);
    }
}

fillAllAnswers(document.getElementsByClassName(arguments[0]));
