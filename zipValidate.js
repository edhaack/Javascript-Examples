$(function() {
	jQuery.validator.addMethod("usZip", function(password, element) { 
		return this.optional(element) || password.match(/^\d{5}([\-]\d{4})?$/);
	}, "You have entered an invalid US Zip Code. Please try again.");
});