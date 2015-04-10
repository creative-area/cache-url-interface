"use strict";

var urlparser = require( "url" );

module.exports = {
	parse: function( url ) {
		if ( url && url !== "" ) {
			var parsedUrl = urlparser.parse( url );
			var protocol = parsedUrl.protocol;
			if ( protocol && protocol.length && protocol.length > 0 ) {
				protocol = protocol.substr( 0, protocol.length - 1 );
			}
			var path = parsedUrl.pathname.split( "/" );
			path.pop();
			return {
				protocol: protocol,
				path: path.join( "/" ) + "/",
				hostname: parsedUrl.hostname
			};
		} else {
			return false;
		}
	}
};
