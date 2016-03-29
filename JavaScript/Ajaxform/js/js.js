/*
Test length input
*/
function testLength(x) {
	if (x.length >=8)
		return true;
	return false;
}
/*
Test input username
*/
function testUsername() {
	var user = document.getElementById('username').value;
	console.log ("Username:"+ user);
	if (user != "" && testLength(user)) {
		document.getElementById('usr-validate').innerHTML = "";
		return true;		
	}
	document.getElementById('usr-validate').innerHTML = "Invalid Username";
	return false;
}
/*
Test length password
*/
function testPassword() {
	var pass = document.getElementById('password').value;
	console.log("Password:" + pass);
	if (pass !="" && testLength(pass)) {
		document.getElementById('pas-validate').innerHTML = "";
		return true;
	}
	document.getElementById('pas-validate').innerHTML = "Invalid Password";
	return false;
}
/*
Test length email
*/
function testEmail() {
	var email = document.getElementById ('email').value;
	console.log ("Email:" + email);
	var aCong = email.indexOf("@");
	var dauCham = email.lastIndexOf(".");
	if (email.length >5 && aCong >1 && dauCham > aCong+2) {
		document.getElementById('ema-validate').innerHTML = "";
		return true;
	}
	document.getElementById('ema-validate').innerHTML = "Invalid Email";
	return false;
}
/*
Test length Date had picked or null
*/
function testDate() {
	var d = document.getElementById('birth').value;
	console.log ("Dat of Birth:" + d);
	if (d != "") {
		document.getElementById('bir-validate').innerHTML = "";
		return true;
	}
	document.getElementById('bir-validate').innerHTML = "Invalid Day of Birth";
	return false;
}
/*
Connection to server.Test data in browser and send it to server.Show result! 
*/
function submitform(url) {
	if (testUsername() && testPassword () && testEmail() && testDate()) {
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
					if (xmlhttp.status = 200 && xmlhttp.readyState == 4) {
						var r = document.getElementById('result');
						r.innerHTML = xmlhttp.responseText;
					}	
				}
	var usr = document.getElementById('username').value;
	var data = "?usr=" + usr;
	url +=data;
	console.log(url);
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
	resetform();
	}
}
/*
Reset all form
*/	
function resetform() {
	var rs="";
	document.getElementById('username').value =rs;
	document.getElementById('password').value =rs;
	document.getElementById('email').value =rs;
	document.getElementById('birth').value =rs;

	document.getElementById('usr-validate').innerHTML=rs;
	document.getElementById('pas-validate').innerHTML=rs;
	document.getElementById('ema-validate').innerHTML=rs;
	document.getElementById('bir-validate').innerHTML=rs;
	document.getElementById('result').innerHTML=rs;
}