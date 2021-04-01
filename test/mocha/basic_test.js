// const kafka = require('kafka-node');
const {expect} = require('chai');
const {SHKafkaProducer,SHKafkaConsumer} = require('../../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const {producerPromise,producer} = require('./config');
const FIST_DATA = {a:1,b:2};
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.test1';

describe('sohu kafka test# ', function() {
    // it('wait for client ready',function(done) {
    //     producerPromise.then(function() {
    //         done();
    //     });
    // });
    it('create a consumer',function(done) {
        let hasDone = false;
        new SHKafkaConsumer({
            name: 'kafka',
            kafkaHost: KAFKA_HOST,
            topics: [ TOPIC_NAME1],
            consumerOption: {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fromOffset: false,
                fetchMaxBytes: 1024*1024,
            },
            doTask:function(messages,callback) {console.log(messages);
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
        }).on(SHKafkaConsumer.EVENT_CONSUMER_ERROR,function(err) {
            console.error('consumer error',err);
            hasDone = true;
            done(err);
        }).on(SHKafkaConsumer.EVENT_CLIENT_READY,function() {
            console.log('the consumer client is ready');
        });


        const producerSH = new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            producerPromise
        });
        producerSH.addData(FIST_DATA, {},function(err) {
            if (err) {
                console.error('write to queue error',err);
                return done('write to queue error');
            }
            console.info('write to kafka finished');
        });

    });

});
