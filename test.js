var test = require('prova'),
    streamSample = require('./');

test('stream-sample [1,2,3]', function(t) {
    var sampler = streamSample(3);
    sampler.write(1);
    sampler.write(2);
    sampler.on('data', function(sample) {
        t.equal(sample.length, 3);
        t.deepEqual(sample, [1, 2, 3]);
        t.end();
    });
    sampler.write(3);
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
        t.end();
    });
    sampler.write(Math.random() * 50);
    sampler.end();
});
