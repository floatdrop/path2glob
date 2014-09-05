/* global describe, it */

var path2glob = require('..');
require('should');

describe('path2glob', function () {
    it('should throw, if path or globs is invalid', function () {
        (function () {
            path2glob();
            path2glob('path');
            path2glob('path', 'string');
        }).should.throw();
    });

    it('should return glob if only one is passed', function () {
        path2glob('path', ['path']).minimatch.pattern.should.eql('path');
    });

    it('should filter negative globs', function () {
        path2glob('path', ['!negative', 'path']).minimatch.pattern.should.eql('path');
    });

    it('should filter non-matching globs', function () {
        path2glob('path', ['path1', 'path']).minimatch.pattern.should.eql('path');
    });

    it('should return best matching glob', function () {
        path2glob('/path/to/file.js', [
            '**/*.js',
            '**/to/*.js',
            '/has/to/file.js'
        ]).minimatch.pattern.should.eql('**/to/*.js');
    });
});
