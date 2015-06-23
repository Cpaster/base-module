;(function(){

	var tplEngine = function (tpl, data) {

		var reg = /<%([^%>]+)?%>/g,
			code = 'var r=[];\n',
			cursor = 0,
			match,
			regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;

		var add = function (line, js) {

			js ? code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n'
				 : code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n' ;

			return add;

		};

		while(match = reg.exec(tpl)){

			add(tpl.slice(cursor, match.index))(match[1], true);

			cursor = match.index + match[0].length;

		}

		add(tpl.substr(cursor, tpl.length - cursor));

		code += 'return r.join("");';

		return new Function("it", code.replace(/[\r\t\n]/g,''))(data);

		

		//return tpl;

	}

	window.Tpl = tplEngine;

})()