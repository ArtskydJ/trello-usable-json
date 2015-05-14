trello-usable-json
==================

[![Build Status](https://travis-ci.org/ArtskydJ/trello-usable-json.svg)](https://travis-ci.org/ArtskydJ/trello-usable-json)
[![Dependency Status](https://david-dm.org/artskydj/trello-usable-json.svg)](https://david-dm.org/artskydj/trello-usable-json)
[![devDependency Status](https://david-dm.org/artskydj/trello-usable-json/dev-status.svg)](https://david-dm.org/artskydj/trello-usable-json#info=devDependencies)

Reduces the ridiculous amount of JSON from trello into the bits you want.

You don't want 150kb of JSON data. You want an array of card strings for each board.

#cli

- Pipe in your JSON from trello. E.g. `'curl https://trello.com/b/6xbOmILH.json'`. (To `curl`, I think the board must be public. You might have to save the file from your browser and pipe it in with `cat` on linux, and `type` on windows.)
- It pipes out some JSON that is usable.
- Wheeeeee!

```
npm install trello-usable-json --global
```

#examples

**curl**

```
$ curl https://trello.com/b/6xbOmILH.json | trello-usable-json
{ "my first list": [
    "a card"
  ], "another list": [
    "cards",
    "CARDS!!!"
  ] }
```

**cat**
(on windows use `type` instead of `cat`)

```
$ cat 6xbOmILH.json | trello-usable-json --archived
{ "my first list": [
    "a card",
    "an archived card"
  ], "another list": [
    "moar cards of archivedness",
    "cards",
    "this one was archived too...",
    "CARDS!!!"
  ], "even another list": [
    "if every card in a list is archived",
    "(like these cards were), then the",
    "list won't show up; cuz it's empty!",
    "note the previous example doesn't have this list."
  ] }
```


#api

```
npm install trello-usable-json
```

```js
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
