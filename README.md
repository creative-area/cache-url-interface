# Cache Url Interface

Cache data by url key.

## Dependencies

`npm`, `wires`, `redis` (for redis cache)

Install libraries dependencies with ```npm install```.

## Cache configuration

Module **namespace**: `cacheUrlInterface`

Default cache is `none`.

To use `redis` cache, set `cacheLibrary` config to `redis` and change redis configuration.

## Configuration outside module

`cacheUrlInterface` **namespace** must be used

```javascript
// defaults
{
  "cacheUrlInterface": {
    "cacheLibrary": "redis",
    "redis": {
      "port": 6379,
      "host": "127.0.0.1",
      "options": {},
      "prefix": "",
      "protocol": false,// false don't cache url protocol. if true, add it
      "error": "Bad url",
      "expire": {
        "ok": 600,
        "ko": 600
      }
    }
  }
}
```


### cache interface

cache interface need to implement 3 methods

```javascript
get: function( url, cb ) {
  // get cached value by url
  if ( good ) {
    cb( null, value );
  } else {
    cb( error );
  }
},
set: function( url, value, ttl, cb ) {
  // set cached value for url
  // if !ttl, use config.expire.ko or config.expire.ok
  if ( good ) {
    return ( cb ) ? cb( null, result ) : true;
  } else {
    return ( cb ) ? cb( error ) : false;
  }
},
del: function( url, cb ) {
  // del cached value by url
  if ( good ) {
    return ( cb ) ? cb( null, keys ) : true;
  } else {
    return ( cb ) ? cb( error ) : false;
  }
}
```
