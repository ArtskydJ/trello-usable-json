var through2 = require('through2')

function reformat(parsed, showClosed) {
	var idToName = parsed.lists.reduce(function (memo, curr) {
		if (showClosed || !curr.closed) {
			memo[curr.id] = curr.name
		}
		return memo
	}, {})
	return parsed.cards.reduce(function (memo, curr) {
		var name = idToName[curr.idList]
		if (showClosed || (name && !curr.closed)) {
			memo[name] = memo[name] || []
			memo[name].push(curr.name)
		}
		return memo
	}, {})
}

var str = ''
process.stdin
	.pipe( through2(function data(buf, enc, cb) {
		str += buf.toString() //concat
		cb()
	}, function end(cb) {
		var parsed = JSON.parse(str)
		var formatted = reformat(parsed, true)
		var stringified = JSON.stringify(formatted)
		this.push(stringified)
		cb()
	}))
	.pipe(process.stdout)
