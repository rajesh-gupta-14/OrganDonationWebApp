function checkpassword(){
	if (document.getElementById('password1').value == document.getElementById('password2').value) {
		document.getElementById('password-validation-msg').innerHTML = "Passwords matched!";
		document.getElementById('update-password').disabled = false;
	} else {
		document.getElementById('password-validation-msg').innerHTML = "Passwords do not match yet!";
		document.getElementById('updated-password').disabled = true;
	}
}
function enableedituserprofile(){
	document.getElementById('fn').disabled = false;
	document.getElementById('ln').disabled = false;
	document.getElementById('email').disabled = false;
	document.getElementById('city').disabled = false;
	document.getElementById('input-hospital').disabled = false;
	document.getElementById('input-country').disabled = false;
	document.getElementById('contact').disabled = false;
	document.getElementById('male').disabled = false;
	document.getElementById('female').disabled = false;
	document.getElementById('other').disabled = false;
	document.getElementById('submit').disabled = false;
	document.getElementById('start').disabled = false;
}
function enableeditpasswords(){
	document.getElementById('password1').disabled = false;
	document.getElementById('password2').disabled = false;
	document.getElementById('password3').disabled = false;
}