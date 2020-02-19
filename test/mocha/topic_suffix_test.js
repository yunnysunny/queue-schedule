// const kafka = require('kafka-node');
const {expect} = require('chai');
const {SHKafkaProducer,SHKafkaConsumer} = require('../../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const {producerPromise,producer} = require('./config');
const FIST_DATA = {a:1,b:2};
const SCHEDULE_NAME1 = 'schedule2';
const TOPIC_NAME1 = 'topic.2';
const TOPIC_SUFFIX = '.my.suffix';

describe('kafka schedule test with topic suffix #', function() {
    // it('wait for client ready',function(done) {
    //     producerPromise.then(function() {
    //         done();
    //     });
    // });
    it('create a producer to send data a topic with suffix ' + TOPIC_SUFFIX, function(done) {

        let hasDone = false;
        new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic:TOPIC_NAME1,
            producerPromise,
        }).on(SHKafkaProducer.EVENT_SEND_ERROR,function(err) {
            hasDone = true;
            done(err);
        }).addData(FIST_DATA,{topicSuffix:TOPIC_SUFFIX},function(err) {
            if (err) {
                console.error('write to queue error',err);
                if (!hasDone) {
                    return done('write to queue error');
                }
            }
            console.info('write to kafka finished');
            done();
        });

    });

    it('create a consumer to consume the topic with suffix ' + TOPIC_SUFFIX,function(done) {

        let hasDone = false;
        new SHKafkaConsumer({
            name: 'kafka',
            kafkaHost: KAFKA_HOST,
            topics: [TOPIC_NAME1+TOPIC_SUFFIX],
            consumerOption:{
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fromOffset: false,
                fetchMaxBytes: 200,
            },
            doTask:function(messages,callback) {//console.log(messages);
                if (!hasDone) {
                    const value = messages[0].value;
                    let data = null;
                    try {
                        data = JSON.parse(value);
                    } catch (e) {
                        hasDone = true;
                        console.error('parse message error',e);
                        return done('parse message error');
                    }
                    expect(data).to.have.property('a').and.equal(1);
                    console.log('recieve data',data);
                    if (!hasDone) {console.log('done',Date.now());hasDone = true;
                        done();
                    }
                    
                }
                callback();
            },
            readCount : 1,
            pauseTime : 500,
            idleCheckInter: 10 * 1000
        }).on(SHKafkaConsumer.EVENT_CONSUMER_ERROR,function(err) {
            console.error('consumer error',err);
            hasDone = true;
            done(err);
        });
    });
});
