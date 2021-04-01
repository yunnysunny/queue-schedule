// const kafka = require('kafka-node');
const {expect} = require('chai');
const { Kafka, CompressionTypes } = require('kafkajs');
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
    it('shoud not send empty value', function() {
        const producer = new KafkaJsProducer({
            topic: TOPIC_NAME1,
            client,
        });
        expect(producer.addData(null)).to.be.equal(false);
        expect(producer.addData()).to.be.equal(false);
    });
    it('should keep plain', function(done) {
        const producer = new KafkaJsProducer({
            topic: 'plain-string-topic',
            client,
        });
        const STR = 'AA';
        const spy = sinon.spy(producer, '_getSendData');
        producer.on(KafkaJsProducer.EVENT_PRODUCER_READY, function() {
            producer.addData(STR);
            expect(spy.returnValues[0]).to.be.equal(STR);
            producer._getSendData.restore();
            done();
        });
    });
    it('should transform to buffer', function(done) {
        const producer = new KafkaJsProducer({
            topic: 'plain-string-topic',
            client,
            encoder: Buffer.from
        });
        const ARRAY = [1,2];
        const spy = sinon.spy(producer, '_getSendData');
        producer.on(KafkaJsProducer.EVENT_PRODUCER_READY, function() {
            producer.addData(ARRAY);
            expect(Buffer.isBuffer(spy.returnValues[0])).to.be.true;
            producer._getSendData.restore();
            done();
        });
    });
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
        const TIMEOUT = 30000;
        const producer = new KafkaJsProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            client,
            delayInterval: DELAY_TIME,
            acks: -1,
            timeout: TIMEOUT,
            compression: CompressionTypes.GZIP
        });
        let hasDone = false;
        producer.on(KafkaJsProducer.EVENT_PRODUCER_READY, function() {
            const spy = sinon.spy(producer.producer, 'sendBatch');

            producer.on(KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED, function(err) {
                if (err) {
                    hasDone = true;
                    console.error('delay send error', err);
                    producer.producer.sendBatch.restore();
                    return done(err);
                }
                const {topicMessages: _needSendTopics, acks, timeout, compression} = spy.getCall(0).args[0];
                expect(acks).to.be.equal(-1);
                expect(timeout).to.be.equal(TIMEOUT);
                expect(compression).to.be.equal(CompressionTypes.GZIP);
                expect(_needSendTopics.length).to.be.equal(1);
                expect(_needSendTopics[0]).to.have.property('topic').and.equal(TOPIC_NAME1);
                expect(_needSendTopics[0]).to.have.property('messages').and.have.property('length').and.equal(COUNT);
                producer.producer.sendBatch.restore();
                done();
            });
            for (var i=0;i<COUNT;i++) {
                producer.addData({
                    ...FIST_DATA,
                    is_delay: true
                }, {},function(err) {
                    if (err) {
                        if (!hasDone) {
                            console.error('write to queue error',err);
                            hasDone = true;
                            producer.producer.sendBatch.restore();
                            return done('write to queue error');
                        }
                    }
                    console.info('write to kafka finished');
                    // return done();
                });
            }
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
