var test = require('tape')
var fs = require('fs')
var cp = require('child_process')
var concat = require('simple-concat')
var tuj = require('../index.js')

function sanitize(str) {
	return str.replace(/\s/g, '')
}

var expectObj = require('./expect.json')
var expectStr = fs.readFileSync(__dirname + '/expect.json', { encoding: 'utf8' })

test('test with archived', function (t) {
	t.plan(3)
	console.log('yeah')
	var stream = fs.createReadStream(__dirname + '/test.json')
	tuj(stream, true, function (err, obj) {
		t.ifError(err)
		t.deepEqual(obj, expectObj)
		t.equal(sanitize(JSON.stringify(obj)), sanitize(expectStr))
		t.end()
	})
})

test('cli', function (t) {
	var stream = fs.createReadStream(__dirname + '/test.json')
	var proc = cp.spawn('node', [ '../bin.js', '-a' ], { cwd: __dirname })
	stream.pipe(proc.stdin)
	concat(proc.stdout, function (err, buf) {
		t.ifError(err)
		t.deepEqual(JSON.parse(buf.toString()), expectObj)
		t.equal(sanitize(buf.toString()), sanitize(expectStr))
		t.end()
	})
})
