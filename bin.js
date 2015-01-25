var tuj = require('./index.js')
var showArchived = /(--archived|-a)/.test(process.argv[2])

tuj(process.stdin, showArchived, function (obj) {
	console.log( JSON.stringify(obj) )
})
