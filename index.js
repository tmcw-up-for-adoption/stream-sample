var through2 = require('through2');

/**
 * @alias stream-sample
 *
 *
 * Stream sampling uses a reservoir.
 *
 * This implements the [reservoir sampling](http://en.wikipedia.org/wiki/Reservoir_sampling)
 * algorithm that allows you to glean a statistically valid fixed-size sample
 * from an unknown-size input while keeping only the sample in memory.
 *
 * This module is different than the [reservoir-stream module](https://github.com/kesla/reservoir-stream)
 * that requires the full input to be concatenated in memory.
 */

/**
 * Create a transform stream that emits an evenly-distributed
 * sample of `sampleCount` items for every new item received.
 *
 * @param {Number} sampleCount the number of elements to be placed in the
 * sample.
 * @returns {Stream.Transform} a transform stream that samples the input.
 * @example
 * var streamSample = require('stream-sample');
 *
 * var sampler = streamSample(10);
 *
 * sampler.on('data', function(sample) {
 *   // sample is n items from the stream
 * });
 *
 * for (var i = 0; i < 100; i++) sampler.push(Math.random());
 */
function streamSample(sampleCount) {
    var sample = new Array(sampleCount),
        i = 0;
    return through2.obj(function (data, enc, callback) {
        // Fill the initial sample.
        if (i < sampleCount) {
            sample[i] = data;
        } else {
            // With decreasing probability, replace sampled
            // items with new items from the stream.
            var randomIndex = Math.round(Math.random() * i);
            if (randomIndex < sampleCount) {
                sample[randomIndex] = data;
            }
        }
        i++;
        this.push(sample);
        callback();
    });
}

module.exports = streamSample;
