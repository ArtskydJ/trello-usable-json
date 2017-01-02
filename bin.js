var tuj = require('./index.js')
var showArchived = /(--archived|-a)/.test(process.argv[2])

tuj(process.stdin, showArchived, function (err, obj) {
	if (err) throw err
	console.log( JSON.stringify(obj) )
})
