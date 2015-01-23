trello-usable-json
==================

Reduces the ridiculous amount of json from trello into the bits you want.

You don't want 250kb of json data. You want an array of card strings for each board.

#install

```
$ npm install -g trello-usable-json
```

- Pipe in your trello json.
- It pipes out the non-archived cards.
- Wheeeeee!

#example

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

#license

[VOL](http://veryopenlicense.com)
