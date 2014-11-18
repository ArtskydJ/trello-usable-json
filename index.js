var https = require('https')
var xtend = require('xtend')
var url = require('url')
var defaultUrl = require('./defaultUrl.json')

function parseArgs(arg) {
	arg = arg || process.argv[2]
	var result = {}
	result = /[\.\/:]/.test(arg)?
		url.parse(arg) :
		{pathname: '/b/' + arg + '.json'}
	result = xtend(defaultUrl, result)
	return url.format(result)
}

function get(trelloUrl, cb) {
	var req = https.request(trelloUrl, function (res) {
		var str = ''
		res.on('error', console.log.bind(console, 'res err:'))
		res.on('data', function (c) { str += c.toString() }) //''.concat.bind(str))
		res.on('end', function () { cb(str) })
	})
	req.on('error', console.log.bind(console, 'req err:'))
	req.end()
}

function parseJson(trelloJson, showClosed) {
	var parsed = JSON.parse(trelloJson)
	/*require('fs').writeFileSync(
		'trello' + Math.random().toString().slice(2) + '.txt',
		require('util').inspect(parsed.lists, {depth:1}),
		{encoding:'utf8'}
	)*/
	var idToName = parsed.lists.reduce(function (memo, curr) {
		if (showClosed || !curr.closed) {
			memo[curr.id] = curr.name
		}
		return memo
	}, {})
	var applied = parsed.cards.reduce(function (memo, curr) {
		var name = idToName[curr.idList]
		if (showClosed || (name && !curr.closed)) {
			memo[name] = memo[name] || []
			memo[name].push(curr.name)
		}
		return memo
	}, {})
	return applied
}

(function () {
	var trelloUrl = parseArgs()
	console.log(trelloUrl)
	get(trelloUrl, function (trelloJson) {
		console.dir(parseJson(trelloJson, false))
	})
})()
