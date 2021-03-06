// const async = require('async');
const {expect} = require('chai');
// const async = require('async');
const {SHKafkaProducer,SHKafkaConsumer} = require('../../index');
const {producerPromise,producer} = require('./config');
const FIST_DATA = {a:1,b:2};
const SCHEDULE_NAME1 = 'schedule3';
const TOPIC_NAME5 = 'topic.5';
const KAFKA_HOST = process.env.KAFKA_PEERS;
const DELAY_INTERVAL = 1000;

describe('kafka schedule with delay producer test # ', function() {
    // it('wait for client ready',function(done) {
    //     producerPromise.then(function() {
    //         done();
    //     });
    // });
    it('create a delay producer', function(done) {

        const kafkaProducer = new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME5,
            delayInterval:DELAY_INTERVAL,
            producerPromise,
        });
        const begin = new Date().getTime();
        
        kafkaProducer.on(SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,function(err) {
            expect(new Date().getTime() - begin).to.be.at.least(DELAY_INTERVAL);
            done(err);
        });
        kafkaProducer.addData(FIST_DATA);
    });
    
    it('create a consumer to consume '+TOPIC_NAME5+ ' delay message',function(done) {
        let hasDone = false;
        new SHKafkaConsumer({
            name: SCHEDULE_NAME1,
            kafkaHost: KAFKA_HOST,
            topics: [TOPIC_NAME5],
            consumerOption:{
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fromOffset: false,
                fetchMaxBytes: 1024*1024,
            },
            doTask:function(messages,callback) {console.log('kafka3',messages);
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
                    //expect(data).to.have.property('a').and.equal(1);
                    console.log('recieve data',data);
                    if (!hasDone) {
                        done();hasDone = true;
                    }
                    
                }
                callback();
            },
            readCount : 1,
            pauseTime : 500,
            idleCheckInter: 5 * 1000
        }).on(SHKafkaConsumer.EVENT_CONSUMER_ERROR,function(err) {
            console.error('consumer error',err);
            hasDone = true;
            done(err);
        });
    });
});
