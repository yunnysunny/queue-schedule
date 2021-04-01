const async = require('async');
const {expect} = require('chai');
const Kafka = require('node-rdkafka');
const slogger = require('node-slogger');
const sinon = require('sinon');
const {RdKafkaProducer,RdKafkaConsumer} = require('../../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const rand = 55;
const FIST_DATA = {a:rand,b:2};
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.rdkafka.rdtest';
//queue.buffering.max.ms 0.5
//queue.buffering.max.messages	100000

const producerRd = new Kafka.HighLevelProducer({
    'metadata.broker.list': KAFKA_HOST,
    'queue.buffering.max.ms': 500,
    'batch.num.messages':100,
    debug: 'all'
});
producerRd.on('event.error',function(err) {
    slogger.error('producer error',err);
});
producerRd.on('event.log',function(log) {
    if (process.env.TRAVIS) {
        slogger.debug('producer log',log);
    }
});
const producer = new RdKafkaProducer({
    name : SCHEDULE_NAME1,
    topic: TOPIC_NAME1,
    producer:producerRd,
});
describe('test-rdkafka# ', function() {
    it('shoud not send empty value', function() {
        expect(producer.addData(null)).to.be.equal(false);
        expect(producer.addData()).to.be.equal(false);
    });
    
    it('send data',function(done) {
        async.times(100,function(n,next) {
            setTimeout(function() {
                producer.addData(FIST_DATA, {},function(err) {
                    if (err) {
                        slogger.error('write to queue error',err);
                        return next('write to queue error');
                    }
                    slogger.info('write to kafka finished');
                    next();
                });
            } , n);
        },done);
    });
    it('send data2',function(done) {
        async.times(200, function(n, next) {
            producer.addData(FIST_DATA, {},function(err) {
                if (err) {
                    slogger.error('write to queue error',err);
                    return next('write to queue error');
                }
                slogger.info('write to kafka finished');
                next();
            });
        }, done);
    });
    it('create a consumer',function(done) {
        const consumer = new Kafka.KafkaConsumer({
            'metadata.broker.list': KAFKA_HOST,
            'group.id': 'test-rdkafka-' + Math.random(),
            'auto.offset.reset':'earliest',
            'socket.keepalive.enable': true,
            'socket.nagle.disable': true,
            'enable.auto.commit': true,
            'fetch.wait.max.ms': 50,
            'fetch.error.backoff.ms': 5,
            'queued.max.messages.kbytes': 1024 * 10,
            debug:'consumer'
        });
        let hasDone = false;
        new RdKafkaConsumer({
            name: 'kafka',
            consumer,
            topics: [ TOPIC_NAME1],
            
            doTask:function(messages,callback) {slogger.trace(messages);
                if (!hasDone) {
                    const value = messages[0].value.toString('utf8');
                    let data = null;
                    try {
                        data = JSON.parse(value);
                        if (Array.isArray(data)) {
                            data = JSON.parse(data[0]);
                        }
                    } catch (e) {
                        hasDone = true;
                        slogger.error('parse message error',e);
                        return done('parse message error');
                    }
                    expect(data).to.have.property('a').and.equal(rand);
                    slogger.trace('recieve data',data);
                    if (!hasDone) {
                        done();
                        hasDone = true;
                    }
                    
                }
                callback();
            },
            readCount : 1,
            pauseTime : 500,
            idleCheckInter: 10 * 1000
        }).on(RdKafkaConsumer.EVENT_CONSUMER_ERROR,function(err) {
            slogger.error('consumer error',err);
            hasDone = true;
            done(err);
        }).on(RdKafkaConsumer.EVENT_CLIENT_READY,function() {
            slogger.info('the consumer client is ready');
            producer.addData(FIST_DATA);
        }).on(RdKafkaConsumer.EVENT_LOG,function(log) {
            if (process.env.TRAVIS) {
                slogger.trace(JSON.stringify(log));
            }
        });
    });
    it('should keep plain', function(done) {
        const producer = new RdKafkaProducer({
            topic: 'plain-string-topic',
            producer:producerRd,
        });
        const STR = 'AA';
        const spy = sinon.spy(producer, '_getSendData');
        producer.on(RdKafkaProducer.EVENT_PRODUCER_READY, function() {
            producer.addData(STR);
            expect(spy.returnValues[0]).to.be.equal(STR);
            producer._getSendData.restore();
            done();
        });
    });
    it('should transform to buffer', function(done) {
        const producer = new RdKafkaProducer({
            topic: 'plain-string-topic',
            producer:producerRd,
            encoder: Buffer.from
        });
        const ARRAY = [1,2];
        const spy = sinon.spy(producer, '_getSendData');
        producer.on(RdKafkaProducer.EVENT_PRODUCER_READY, function() {
            producer.addData(ARRAY);
            expect(Buffer.isBuffer(spy.returnValues[0])).to.be.true;
            producer._getSendData.restore();
            done();
        });
    });
});
