trello-usable-json
==================

Reduces the ridiculous amount of json from trello into the bits you want.

You don't want 150kb of json data. You want an array of card strings for each board.

#cli

- Pipe in your trello json.
- It pipes out the non-archived cards.
- Wheeeeee!

```
npm install trello-usable-json --global
```

```
$ curl https://trello.com/b/6xbOmILH.json | trello-usable-json
{ "my first list": [
    "a card",
    "another card"
  ], "another list": [
    "moar cards",
    "cards,",
    "Cards,",
    "CARDS!!!"
  ] }
```

#api

```
npm install trello-usable-json
```

```
var tuj = require('trello-usable-json')
```

###tuj(stream, [showArchived,] cb)

- `stream` of trello's JSON data. (Readable.)
- `showArchived` is whether or not to show archived cards. Defaults to `false`.
- `cb` is the callback with the following parameters:
	- `err` is null or an Error object
	- `obj` is the finished object.

```js
var usable = require('trello-usable-json')
var request = require('request')

var stream = request('https://trello.com/b/6xbOmILH.json')
usable(stream, function (err, obj) {
	//ignore err
	Object.keys(obj).forEach(function (board) {
		console.log('BOARD: ' + board)
		obj[board].forEach(function (card) {
			console.log('card: ' + card)
		})
	})
})
```

#license

[VOL](http://veryopenlicense.com)
