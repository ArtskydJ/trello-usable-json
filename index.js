var concat = require('concat-stream')
var JSONparse = require('safe-json-parse')

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
	if (!cb) cb = function () {}
	stream.pipe(concat({ encoding: 'utf8' }, function (str) {
		JSONparse(str, function (err, json) {
			if (err) {
				cb(err)
			} else {
				var result = reformat(json, showArchived)
				cb(null, result)
			}
		})
	}))
}
