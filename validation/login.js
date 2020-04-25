const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateLoginInput(data){
	let errors = {};
	
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	
	
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is Invalid';
	}
	
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field is Required';
	}
	
	if(Validator.isEmpty(data.password)){
		errors.password = 'Password field is Required';
	}
	
	
	return {
		errors, 
		isValid: isEmpty(errors)
	} 
}