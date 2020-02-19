// const kafka = require('kafka-node');
const {expect} = require('chai');
const Kafka = require('node-rdkafka');
const slogger = require('node-slogger');
const {RdKafkaProducer,RdKafkaConsumer} = require('../../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const rand = 55;
const FIST_DATA = {a:rand,b:2};
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.rdkafka';
//queue.buffering.max.ms 0.5
//queue.buffering.max.messages	100000
describe('test-rdkafka# ', function() {
    it('create a producer',function(done) {
        const producerRd = new Kafka.HighLevelProducer({
            'metadata.broker.list': KAFKA_HOST,
            'linger.ms':0.1,
            'queue.buffering.max.ms': 500,
            'queue.buffering.max.messages':1000,
            // debug: 'all'
        });
        producerRd.on('event.error',function(err) {
            slogger.error('producer error');
        });
        producerRd.on('event.log',function(log) {
            slogger.debug('producer log',log);
        });
        const producer = new RdKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            producer:producerRd,
            delayInterval: 500
        });
        producer.addData(FIST_DATA, {},function(err) {
            if (err) {
                slogger.error('write to queue error',err);
                return done('write to queue error');
            }
            slogger.info('write to kafka finished');
            done();
        });
    });
    it('create a consumer',function(done) {
        const consumer = new Kafka.KafkaConsumer({
            'metadata.broker.list': KAFKA_HOST,
            'group.id': 'test-rdkafka-0',
            'auto.offset.reset':'earliest',
            'socket.keepalive.enable': true,
            'socket.nagle.disable': true,
            'enable.auto.commit': true,
            'fetch.wait.max.ms': 5,
            'fetch.error.backoff.ms': 5,
            'queued.max.messages.kbytes': 1024 * 10,
            debug:'all'
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
            slogger.trace('the consumer client is ready');
            
        }).on(RdKafkaConsumer.EVENT_LOG,function(log) {
            // slogger.trace(JSON.stringify(log));
        });
    });

});
