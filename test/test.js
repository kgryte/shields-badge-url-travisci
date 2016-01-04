'use strict';

// MODULES //

var test = require( 'tape' );
var urls = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof urls === 'function', 'main export is a function' );
	t.end();
});

test( 'an `options` argument is required', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls();
	}
});

test( 'a repository `owner` must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'repo': 'beep'
		});
	}
});

test( 'a repository name must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'owner': 'beep'
		});
	}
});

test( 'the function returns an object containing `image` and `url` fields', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});

	t.equal( typeof out.image, 'string', 'image field is a string' );
	t.equal( typeof out.url, 'string', 'url field is a string' );
	t.end();
});

test( 'the `image` field corresponds to a shields.io badge url', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat', 'image url' );
	t.end();
});

test( 'the `url` field corresponds to the repository url on Travis CI', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.url, 'https://travis-ci.org/beep/boop', 'Travis CI url' );
	t.end();
});

test( 'the default repository branch is `master`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat', 'image url' );
	t.equal( out.url, 'https://travis-ci.org/beep/boop', 'Travis CI url' );
	t.end();
});

test( 'the repository branch can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'branch': 'develop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/develop.svg?style=flat', 'image url' );
	t.equal( out.url, 'https://travis-ci.org/beep/boop', 'Travis CI url' );
	t.end();
});

test( 'the default badge style is `flat`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat', 'image url' );
	t.end();
});

test( 'the badge style can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'style': 'flat-square'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat-square', 'image url' );
	t.end();
});

test( 'the default badge format is `svg`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat', 'image url' );
	t.end();
});

test( 'the badge format can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'format': 'png'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.png?style=flat', 'image url' );
	t.end();
});

test( 'the default badge url corresponds to a public repository', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/travis/beep/boop/master.svg?style=flat', 'image url' );
	t.end();
});
