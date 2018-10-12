var storageUtil = {}
// type： 0为sessionstorage 1为locationstorage
var setStorage = function(key,value,type){
	switch(type) {
		case 0:
			sessionStorage.setItem(key, value);
			break;
		case 1:
			localStorage.setItem(key, value);
			break;
		default:
			localStorage.setItem(key, value);
			break;	
	}
}

var getStorage = function(key,type){
	var result = null;
	switch(type) {
		case 0:
			result = sessionStorage.getItem(key);
			break;
		case 1:
			result = localStorage.getItem(key);
			break;
		default:
			result = localStorage.getItem(key);
			break;	
	}
	return result;
}

var removeStorage = function(key,type){
	switch(type) {
		case 0:
			result = sessionStorage.removeItem(key);
			break;
		case 1:
			result = localStorage.removeItem(key);
			break;
		default:
			result = localStorage.removeItem(key);
			break;	
	}
}

storageUtil.setStorage = setStorage;
storageUtil.getStorage = getStorage;
storageUtil.removeStorage = removeStorage;
module.exports = storageUtil