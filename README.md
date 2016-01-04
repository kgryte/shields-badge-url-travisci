Travis CI Badge URLs
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates [Shields.io][shields] badge URLs for [Travis CI][travis-ci].


## Installation

``` bash
$ npm install shields-badge-url-travisci
```


## Usage

``` javascript
var urls = require( 'shields-badge-url-travisci' );
```

#### urls( opts )

Creates [Shields.io][shields] badge URLs for [Travis CI][travis-ci].

``` javascript
var opts = {
	'owner': 'dstructs',
	'repo': 'matrix'
};

var out = urls( opts );
/*
	{
		"image": "https://img.shields.io/travis/dstructs/matrix/master.svg?style=flat",
		"url": "https://travis-ci.org/dstructs/matrix"
	}
*/ 
```

The `function` accepts the following `options`:
*	__owner__: repository owner (*required*).
*	__repo__: repository name (*required*).
*	__branch__: repository branch. Default: `master`.
*	__style__: badge style. Default: `flat`.
*	__format__: badge format. Default: `svg`.


## Examples

``` javascript
var getKeys = require( 'object-keys' ).shim();
var url = require( 'url' );
var list = require( 'npm-list-author-packages' );
var repoUrls = require( 'npm-repo-url' );
var badgeUrls = require( 'shields-badge-url-travisci' );

// Generate badge URLs for all of an author's packages...
list( {'username': 'kgryte'}, onList );

function onList( error, list ) {
	var opts;
	if ( error ) {
		throw error;
	}
	if ( !list.length ) {
		return;
	}
	opts = {
		'packages': list
	};
	repoUrls( opts, onUrls );
}

function onUrls( error, results ) {
	var badge;
	var parts;
	var urls;
	var pkgs;
	var path;
	var i;
	if ( error ) {
		throw error;
	}
	urls = results.data;
	pkgs = getKeys( urls );

	// Note: we assume all repository URLs are of the form: git://github.com/{{owner}}/{{repo}}.git
	for ( i = 0; i < pkgs.length; i++ ) {
		parts = url.parse( urls[ pkgs[i] ] );
		path = parts.pathname.split( '/' );
		badge = badgeUrls({
			'owner': path[ 1 ],
			'repo': path[ 2 ].slice( 0, -4 )
		});
		console.log( badge );
	}
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g shields-badge-url-travisci
```


### Usage

``` bash
Usage: shields-travisci --owner=<owner> --repo=<repo> [options]

Options:

  -h,  --help                Print this message.
  -V,  --version             Print the package version.
       --owner owner         Repository owner.
       --repo repo           Repository name.
       --branch branch       Repository branch. Default: 'master'.
       --style style         Badge style. Default: 'flat'.
       --format format       Badge format. Default: 'svg'.
```


### Examples

``` bash
$ shields-travisci --owner=dstructs --repo=matrix
# => {"image":"https://img.shields.io/travis/dstructs/matrix/master.svg?style=flat","url":"https://travis-ci.org/dstructs/matrix"}
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/shields-badge-url-travisci.svg
[npm-url]: https://npmjs.org/package/shields-badge-url-travisci

[build-image]: http://img.shields.io/travis/kgryte/shields-badge-url-travisci/master.svg
[build-url]: https://travis-ci.org/kgryte/shields-badge-url-travisci

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/shields-badge-url-travisci/master.svg
[coverage-url]: https://codecov.io/github/kgryte/shields-badge-url-travisci?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/shields-badge-url-travisci.svg
[dependencies-url]: https://david-dm.org/kgryte/shields-badge-url-travisci

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/shields-badge-url-travisci.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/shields-badge-url-travisci

[github-issues-image]: http://img.shields.io/github/issues/kgryte/shields-badge-url-travisci.svg
[github-issues-url]: https://github.com/kgryte/shields-badge-url-travisci/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
[travis-ci]: https://travis-ci.org
[shields]: http://shields.io/
