var trello = require('./trello.json')
var util = require('util')
var obj = trello.cards.reduce(function (memo, curr) {
	memo[curr.idList] = memo[curr.idList] || []
	memo[curr.idList].push(curr.name)
	return memo
}, {})
console.dir(obj)