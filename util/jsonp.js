module.exports = {
	now: function() {
		return +new Date;
	},
	rand: function() {
		return Math.random().toString().substr(2);
	},
	removeElement: function(elem) {
		var parent = elem.parentNode;
		if(parent && parent.nodeType !== 11){
			parent.removeChild(elem);
		}
	},
	parseUrl: function(data) {
		var ret = "";
		if(typeof data == "string"){
			ret = data;
		}else if(typeof data == "object"){
			for(var key in data){
				ret += "&" + key + "=" + encodeURIComponent(data[key]);
			}
		}
		ret += "&_time=" + this.now();

		return ret;
	},
	getJSON: function(url, data, callback){
		var callback_name;
		var _this = this;
		url = url + (url.indexOf("?") !== -1 ? "&" : "?" ) + this.parseUrl(data);

		var match = /callback=(\w+)/.exec(url);
		if(match && match[1]){
			callback_name = match[1];
		}else{
			callback_name = "json_" + this.now() + "_" + this.rand();
			url += "&callback=" + callback_name;
		}
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.id = "id_" + callback_name;

		window[callback_name] = function(json){
			window[callback_name] = undefined;
			var elem = document.getElementById("id_" + callback_name);
			_this.removeElement(elem);
			callback && callback(json);
		}

		var head = document.getElementsByTagName("head");
		if(head && head[0]){
			head[0].appendChild(script);
		}
	}
}