function checkpassword(){
	if (document.getElementById('password1').value == document.getElementById('password2').value) {
		document.getElementById('password-validation-msg').innerHTML = "Passwords matched!";
		document.getElementById('submit').disabled = false;
	} else {
		document.getElementById('password-validation-msg').innerHTML = "Passwords do not match yet!";
		document.getElementById('submit').disabled = true;
	}
}