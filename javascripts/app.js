function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}

	return "";
}

function isCookie(cname) {
	var mycookie=getCookie(cname);
	if (mycookie != "") 
		return true;
	else
		return false;
}

function maskPage () {
	$('#mask').show();
}

function unmaskPage () {
	$('#mask').hide();
}

function setCredentials (uid, pwd) {
	setCookie('{{ site.name }}-uid', uid, 2);
	setCookie('{{ site.name }}-pwd', pwd, 2);
}

function isValidCredentials (success, failure) {
	if (isCookie('{{ site.name }}-uid') == '' || isCookie('{{ site.name }}-pwd') == '') {
		failure();
	} else {
		// Recover the uid and pwd from the cookie
		var uid = getCookie('{{ site.name }}-uid');
		var pwd = getCookie('{{ site.name }}-pwd');
		// TODO: Use the uid/pwd in an AJAX call to check them against a remote server
		// For now, let it go and success call back
		success();
	}
}

function isValidCredentialsSuccess() {
	$('#siteLoginDlg').modal('hide');
	unmaskPage(); 
}

function isValidCredentialsFailure() {
	maskPage();
	$('#siteLoginDlg').modal('show');
}

function checkCredentials () {
	isValidCredentials(isValidCredentialsSuccess, isValidCredentialsFailure);
}
