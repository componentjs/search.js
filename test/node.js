
var co = require('co');
var assert = require('assert');
var rimraf = require('rimraf');

var search = require('..');

describe('Search', function () {
  it('should delete the cache', function (done) {
    rimraf(search.cache.filename, done);
  })

  it('should find jonathanong/routington', co(function* () {
    var components = yield* search({
      text: 'routington'
    })

    assert(components.some(function (json) {
      return json.github.full_name === 'jonathanong/routington';
    }))
  }))

  it('should find jonathanong', co(function* () {
    var components = yield* search({
      owner: 'jonathanong'
    });

    assert(components.length);

    assert(components.every(function (json) {
      return json.github.owner.login === 'jonathanong';
    }))
  }))
})