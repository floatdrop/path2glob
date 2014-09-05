/* global describe, it */

var path = require('path');
var path2glob = require('..');
require('should');

function p(ath) {
    return path.join(__dirname, ath);
}

describe('path2glob', function () {
    it('should throw, if path or globs is invalid', function () {
        (function () {
            path2glob();
            path2glob('path');
            path2glob('path', 'string');
        }).should.throw();
    });

    it('should work with negative globs', function () {
        path2glob(p('path'), [p('!negative'), p('path')]).minimatch.pattern.should.eql(p('path'));
    });

    it('should filter non-matching globs', function () {
        path2glob(p('path'), [p('path1'), p('path')]).minimatch.pattern.should.eql(p('path'));
    });

    it('should return best matching glob', function () {
        path2glob(p('path/to/file.js'), [
            p('**/*.js'),
            p('**/to/*.js'),
            p('/has/to/file.js')
        ]).minimatch.pattern.should.eql(p('**/to/*.js'));
    });

    it('should match on **/*', function () {
        path2glob(
            path.join(__dirname, 'subfolder/1/2.txt'),
            [ 'test/subfolder/**/*' ]
        ).minimatch.pattern.should.eql(path.join(__dirname, 'subfolder/**/*'));
    });
});
