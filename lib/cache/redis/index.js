"use strict";

var config = require( "#redis" );
var redis = require( "redis" );
var client = redis.createClient( config.port, config.host, config.options );
var urlparser = require( ":urlParser" );

client.on( "error", function ( err ) {
	console.log( "Redis Error:" );
	console.log( err );
} );

var cache = {
	url2key: function( _url ) {
		var url = urlparser.parse( _url );
		if ( url === false ) {
			return false;
		}
		if ( url.protocol === null || url.path === null || url.hostname === null ) {
			return false;
		}
		return url.protocol + "://" + url.hostname + url.path;
	},
	get: function( url, cb ) {
		var key = cache.url2key( url );
		if ( key === false ) {
			return cb( config.error );
		}
		client.get( config.prefix + key, function( err, value ) {
			if ( err ) {
				return cb( err );
			}
			return cb( null, value );
		} );
	},
	set: function( url, value, ttl, cb ) {
		var key = cache.url2key( url );
		if ( key === false ) {
			return ( cb ) ? cb( config.error ) : false;
		}
		client.set( config.prefix + key, value, function( err, result ) {
			if ( err ) {
				return ( cb ) ? cb( err ) : false;
			}
			if ( value === 0 ) {
				client.expire( config.prefix + key, ( ttl || config.expire.ko ) ); // in seconds
			}  else {
				client.expire( config.prefix + key, ( ttl || config.expire.ok ) ); // in seconds
			}
			return ( cb ) ? cb( null, result ) : true;
		} );
	},
	del: function( url, cb ) {
		var key = cache.url2key( url );
		if ( key === false ) {
			return ( cb ) ? cb( config.error ) : false;
		}
		client.keys( config.prefix + key + "*", function( err, keys ) {
			if ( err ) {
				return ( cb ) ? cb( err ) : false;
			}
			keys.forEach( function( key ) {
				client.del( key );
			} );
			return ( cb ) ? cb( null, keys ) : true;
		} );
	}
};

module.exports = cache;
