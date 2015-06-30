var trello = require('trello-usable-json')
var objToHtml = require('json-to-html')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')

var opts = {
	headers: {
		'Access-Control-Allow-Origin': true
	}
}

function parse(link) {
	console.log('link', link)
	hyperquest(link, opts, function (err, res) {
		if (err) throw err
		res.pipe(concat({ encoding: 'utf-8' }, function (str) {
			var obj = JSON.parse(str)
			document.getElementById('JSON1').innerHTML = objToHtml(obj)
		}))
		trello(res, false, function (err, obj) {
			if (err) throw err
			document.getElementById('JSON2').innerHTML = objToHtml(obj)
		})
	})
}

var linkBox = document.getElementById('link-box')
linkBox.onchange = function (ev) {
	parse(linkBox.value)
}
