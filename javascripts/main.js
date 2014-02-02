var mainService = new function () {
	var setCookie = function (cname,cvalue,exdays) {	
	    var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	deleteCookie = function (cname) {	
		setCookie(cname, "", -1);
	},

	getCookie = function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}

		return "";
	},

	isCookie = function(cname) {
		var mycookie=getCookie(cname);
		if (mycookie != "") 
			return true;
		else
			return false;
	},

	maskPage = function () {
		$('#mask').show();
	},

	unmaskPage = function () {
		$('#mask').hide();
	},

	setCredentials = function (uid, pwd) {
		setCookie('{{ site.name }}-uid', uid, 2);
		setCookie('{{ site.name }}-pwd', pwd, 2);
	},

	isValidCredentials = function (success, failure) {
		if (isCookie('{{ site.name }}-uid') == '' || isCookie('{{ site.name }}-pwd') == '') {
			failure();
		} else {
			// Recover the uid and pwd from the cookie
			var uid = getCookie('{{ site.name }}-uid');
			var pwd = getCookie('{{ site.name }}-pwd');
			// TODO: Use the uid/pwd in an AJAX call to check them against a remote service. Make sure you include the site name in the request.
			// TODO: My remote service authenticates the request and returns OK or ERROR
			// TODO: My remote service resets the password every 3 days via a scheduler and emails its users the new passwords
			// For now, let it go and success call back
			success();
		}
	},

	isValidCredentialsSuccess = function () {
		$('#siteLoginDlg').modal('hide');
		unmaskPage(); 
	},

	isValidCredentialsFailure = function () {
		maskPage();
		$('#siteLoginDlg').modal('show');
	},

	checkCredentials = function () {
		isValidCredentials(isValidCredentialsSuccess, isValidCredentialsFailure);
	},

	deleteCredentials = function () {
		deleteCookie('{{ site.name }}-uid');
		deleteCookie('{{ site.name }}-pwd');
		checkCredentials();
	};

    return {
        setCredentials: setCredentials,
        checkCredentials: checkCredentials,
        deleteCredentials: deleteCredentials
	};
}();
