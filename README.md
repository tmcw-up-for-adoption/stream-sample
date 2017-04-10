# stream-sample

[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/stream-sample.svg)](https://greenkeeper.io/)

[![build status](https://secure.travis-ci.org/tmcw/stream-sample.png)](http://travis-ci.org/tmcw/stream-sample)

sample streams using reservoir sampling


### `stream-sample`

Stream sampling uses a reservoir.

This implements the [reservoir sampling](http://en.wikipedia.org/wiki/Reservoir_sampling)
algorithm that allows you to glean a statistically valid fixed-size sample
from an unknown-size input while keeping only the sample in memory.

This module is different than the [reservoir-stream module](https://github.com/kesla/reservoir-stream)
that requires the full input to be concatenated in memory.`




### `streamSample(sampleCount)`

Create a transform stream that emits an evenly-distributed
sample of `sampleCount` items for every new item received.


### Parameters

| parameter     | type   | description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `sampleCount` | Number | the number of elements to be placed in the sample. |


### Example

```js
var streamSample = require('stream-sample');

var sampler = streamSample(10);

sampler.on('data', function(sample) {
  // sample is n items from the stream
});

for (var i = 0; i < 100; i++) sampler.push(Math.random());
```


**Returns** `Stream.Transform`, a transform stream that samples the input.

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install stream-sample
```

## Tests

```sh
$ npm test
```


