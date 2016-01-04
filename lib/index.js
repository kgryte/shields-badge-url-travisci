'use strict';

// MODULES //

var mustache = require( 'mustache' );
var validate = require( './validate.js' );


// TEMPLATES //

var URL = 'https://travis-ci.org/{{owner}}/{{repo}}';
var IMAGE = 'https://img.shields.io/travis/{{owner}}/{{repo}}/{{branch}}.{{format}}?style={{style}}';

mustache.parse( URL );
mustache.parse( IMAGE );


// URLS //

/**
* FUNCTION: urls( options )
*	Creates Shields.io badge URLs.
*
* @param {Object} options - function options
* @param {String} options.owner - repository owner
* @param {String} options.repo - repository name
* @param {String} [options.branch="master"] - repository branch
* @param {String} [options.style="flat"] - badge style
* @param {String} [options.format="svg"] - badge format
* @returns {Object}
*/
function urls( options ) {
	var opts;
	var out;
	var err;

	opts = {};
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	opts.branch = opts.branch || 'master';
	opts.style = opts.style || 'flat';
	opts.format = opts.format || 'svg';

	out = {};
	out.image = mustache.render( IMAGE, opts );
	out.url = mustache.render( URL, opts );

	return out;
} // end FUNCTION urls()


// EXPORTS //

module.exports = urls;
