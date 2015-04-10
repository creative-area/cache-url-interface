var cache = require( ":cacheLibrary" );
cache.parser = require( ":urlParser" ).parse;

module.exports = cache;
