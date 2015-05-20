var test = require('tap').test
var fs = require('fs')
var tuj = require('../index.js')

function sanitize(str) {
	return str.replace(/\s/g, '')
}

test('test with archived', function (t) {
	t.plan(3)
	console.log('yeah')
	var stream = fs.createReadStream(__dirname + '/test.json')
	var expectObj = require('./expect.json')
	var expectStr = fs.readFileSync(__dirname + '/expect.json', {encoding:'utf8'})
	tuj(stream, true, function (err, obj) {
		t.notOk(err, err ? err.message : 'no error')
		t.deepEqual(obj, expectObj, 'all the values are correct')
		t.equal(sanitize(JSON.stringify(obj)), sanitize(expectStr), 'exact strings match')
		t.end()
	})
})
