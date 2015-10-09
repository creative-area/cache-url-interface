"use strict";

var urlparser = require( "url" );

module.exports = {
	parse: function( url ) {
		if ( url && url !== "" ) {
			if ( url.substr( 0, 4 ) !== "http" ) {
				url = "http://" + url;
			}
			var parsedUrl = urlparser.parse( url );
			var protocol = parsedUrl.protocol;
			if ( protocol && protocol.length && protocol.length > 0 ) {
				protocol = protocol.substr( 0, protocol.length - 1 );
			}
			if ( parsedUrl.pathname.substr( 0, 3 ) === "/*." ) {
				parsedUrl = urlparser.parse( url.split( "/*." ).join( "/------." ) );
			}
			var path = parsedUrl.pathname.split( "/" );
			path.pop();
			return {
				protocol: protocol,
				path: path.join( "/" ) + "/",
				hostname: parsedUrl.hostname.split( "------." ).join( "*." )
			};
		} else {
			return false;
		}
	}
};
