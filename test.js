var test = require('tape'),
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
