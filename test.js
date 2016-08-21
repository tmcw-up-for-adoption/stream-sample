var test = require('tape-async'),
    streamSample = require('./');

test('stream-sample [1,2,3]', function(t) {
    var sampler = streamSample(3);
    sampler.write(1);
    sampler.write(2);
    sampler.on('data', function(sample) {
        t.equal(sample.length, 3);
        t.deepEqual(sample, [1, 2, 3]);
    });
    sampler.write(3);
    t.end();
});

test('stream-sample when sample size bigger than stream', function(t) {
    var sampler = streamSample(5);
    var nbOfSamplesIssued = 0;
    sampler.write(1);
    sampler.write(2);
    sampler.on('data', function(sample) {
        nbOfSamplesIssued++;
        t.equal(sample.length, 5);
        t.deepEqual(sample, [1, 2, 3, , ,]);
    });
    sampler.write(3);
    sampler.end();
    sampler.on('end', function () {
      t.equal(nbOfSamplesIssued, 3);
      t.end();
    });
});

test('stream-sample when emitting only the last sample', function(t) {
    var sampler = streamSample(5, true);
    var nbOfSamplesIssued = 0;
    sampler.write(1);
    sampler.write(2);
    sampler.on('data', function(sample) {
        nbOfSamplesIssued++;
        t.equal(sample.length, 5);
        t.deepEqual(sample, [1, 2, 3, , ,]);
    });
    sampler.write(3);
    sampler.end();
    sampler.on('end', function () {
      t.equal(nbOfSamplesIssued, 1);
      t.end();
    });
});

test('stream-sample when using a collector', function(t) {
    var collector = new Array(5)
    var sampler = streamSample(collector);
    var nbOfSamplesIssued = 0;
    sampler.write(1);
    sampler.write(2);
    sampler.on('data', function() {});
    sampler.write(3);
    sampler.end();
    sampler.on('end', function () {
      t.deepEqual(collector, [1, 2, 3, , ,]);
      t.end();
    });
});



test('stream-sample lots', function(t) {
    var sampler = streamSample(10);
    for (var i = 0; i < 1000; i++) {
        sampler.write(Math.random() * 50);
    }
    sampler.on('data', function(sample) {
        t.equal(sample.length, 10);
        sample.forEach(function(s) {
            t.ok(s > 0);
            t.ok(s < 50);
        });
    });
    sampler.write(Math.random() * 50);
    sampler.end();
    t.end();
});
