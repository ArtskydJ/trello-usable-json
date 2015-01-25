var through2 = require('through2')

function reformat(parsed, showArchived) {
	var idToName = parsed.lists.reduce(function (memo, curr) {
		if (showArchived || !curr.closed) {
			memo[curr.id] = curr.name
		}
		return memo
	}, {})
	return parsed.cards.reduce(function (memo, curr) {
		var name = idToName[curr.idList]
		if (showArchived || (name && !curr.closed)) {
			memo[name] = memo[name] || []
			memo[name].push(curr.name)
		}
		return memo
	}, {})
}

module.exports = function tuj(stream, showArchived, cb) {
	if (typeof showArchived === 'function') {
		cb = showArchived
		showArchived = false
	}
	cb = cb || function () {}
	var str = ''
	stream.on('data', function (chunk) {
		str += chunk.toString() //concat
	})
	stream.on('end', function () {
		cb(null, reformat(JSON.parse(str), showArchived) )
	})
}
