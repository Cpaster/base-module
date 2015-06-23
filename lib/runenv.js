var extend = require("../util/extend");
var util = require("../util/util");

var DEFAULT = {
	url:{
		"beta": ["t.51ping.com"],
		"ppe": ["ppe.t.dianping.com"],
		"dev": ["t.dianping.com"]
	}
}

var runEnv = function(option){

	return new RunEnv(option);

}

var RunEnv = function(option){

	this.option = extend(DEFAULT, option || {});

}

RunEnv.prototype.judgeEnv = function () {

	var path = location.host,
		url_obj = this.option.url,
		envName;

	for(var i in url_obj){

		if(url_obj[i] == path){
			envName = i;
		}

	}

	return envName || "beta";

}

RunEnv.prototype.envUrl = function () {

	var env = this.judgeEnv();

	switch(env){

		case "beta": 
			return this.option.url['beta'][1] ? this.option.url['beta'][1] : this.option.url['beta'][0];
			break;
		case "ppe": 
			return this.option.url['ppe'][1] ? this.option.url['ppe'][1] : this.option.url['ppe'][0];
			break;
		case "dev":
			return this.option.url['dev'][1] ? this.option.url['dev'][1] : this.option.url['dev'][0];
			break;
	}

}

RunEnv.prototype.callBack = function () {

	var callback_obj = this.option.callback;

	if(!util.isEmptyObject(callback_obj)){

		var env = this.judgeEnv();

		switch(env){

			case "beta": 
				this.option.callback['beta']();
				break;
			case "ppe": 
				this.option.callback['ppe']();
				break;
			case "dev":
				this.option.callback['dev']();
				break;
		}

	}else{

		return new Error("callback object should not empty");

	}

}

module.exports = runEnv