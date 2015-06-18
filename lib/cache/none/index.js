"use strict";

var OK = function( url, cb ) {
	return ( cb ) ? cb( null, null ) : false;
};

module.exports = {
	get: OK,
	set: function( url, value, ttl, cb ) {
		return ( cb ) ? cb( null, "OK" ) : false;
	},
	del: OK
};
