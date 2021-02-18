// const kafka = require('kafka-node');
const {expect} = require('chai');
const { Kafka } = require('kafkajs');
const sinon = require('sinon');
const {KafkaJsProducer,KafkaJsConsumer} = require('../../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const FIST_DATA = {a:1,b:2};
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.kafkajs';
const client =  new Kafka({
    brokers: KAFKA_HOST.split(',')
});
describe('kafkajs test# ', function() {
    it('create an immediately producer',function(done) {
        const producer = new KafkaJsProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            client,
        });
        producer.addData(FIST_DATA, {},function(err) {
            if (err) {
                console.error('write to queue error',err);
                return done('write to queue error');
            }
            console.info('write to kafka finished');
            return done();
        });
    });
    it('create a delay producer', function(done) {
        const DELAY_TIME = 500;
        const COUNT = 3;
        const producer = new KafkaJsProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            client,
            delayInterval: DELAY_TIME
        });
        let hasDone = false;
        producer.on(KafkaJsProducer.EVENT_PRODUCER_READY, function() {
            const spy = sinon.spy(producer.producer, 'sendBatch');
            for (var i=0;i<COUNT;i++) {
                producer.addData(FIST_DATA, {},function(err) {
                    if (err) {
                        if (!hasDone) {
                            console.error('write to queue error',err);
                            hasDone = true;
                            return done('write to queue error');
                        }
                    }
                    console.info('write to kafka finished');
                    // return done();
                });
            }
            
            setTimeout(function() {
                const _needSendTopics = spy.getCall(0).args[0];
                expect(_needSendTopics.length).to.be.equal(1);
                expect(_needSendTopics[0]).to.have.property('topic').and.equal(TOPIC_NAME1);
                expect(_needSendTopics[0]).to.have.property('messages').and.have.property('length').and.equal(COUNT);
                producer.producer.sendBatch.restore();
                done();
            }, DELAY_TIME * 2);
        });
        producer.on(KafkaJsProducer.EVENT_PRODUCER_ERROR, function(err) {
            done(err);
        });
        
    });


    it('create a consumer',function(done) {
        let hasDone = false;
        new KafkaJsConsumer({
            name: 'kafka',
            client,
            topic: TOPIC_NAME1,
            consumerOption: {
                groupId: 'kafkajs',
                fromBeginning: true
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
        }).on(KafkaJsConsumer.EVENT_CONSUMER_ERROR,function(err) {
            console.error('consumer error',err);
            hasDone = true;
            done(err);
        }).on(KafkaJsConsumer.EVENT_CONSUMER_READY,function() {
            console.log('the consumer is ready');
        });
    });

});
