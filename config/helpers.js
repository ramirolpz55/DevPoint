'use strict';

exports.yell = function (msg) {
     return msg.toUpperCase();
};
exports.section = function(name, script){
    		if(!this._sections) this._sections = {};
    		this._sections[name] = script.fn(this);
    		return null;
    	};