const {expect} = require('chai');
const slogger = require('node-slogger');
const Kafka = require('node-rdkafka');
const { Kafka: KafkaJs } = require('kafkajs');

const {SHKafkaProducer, RdKafkaProducer, KafkaJsProducer} = require('../../index');
const {producerPromise} = require('./config');
const KAFKA_HOST = process.env.KAFKA_PEERS;

const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.error';
const client =  new KafkaJs({
    brokers: ['none-exist:9092'],
    retry: {
        retries: 1
    },
});

describe('error test#',function() {
    it('should return error when the broker address is not availabe', function(done) {
        const producerRd = new Kafka.HighLevelProducer({
            'metadata.broker.list': '1.1.1.1:9988',
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
        producer.addData({}, {},function(err) {
            expect(err).to.be.not.null;
            done();
        });
    });
    it('should return error when the send data is too long', function(done) {
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
            topic: TOPIC_NAME1,
            producer:producerRd,
        });
        const data = 'a'.repeat(1024 * 1024 * 2);
        producer.addData(data, {},function(err) {
            expect(err).to.be.not.null;
            done();
        });
    });
    it('should emit error event', function(done) {
        // const begin = new Date().getTime();
        const len = 10000;

        const data = {'content':'对于经常出差的人们来说，提着个笨重的行李箱、还要拿出笔记本找个舒适的姿势工作，绝不是一件轻松的事情。不过一款名为 Smartoo 的小玩意，或许能够给你带来意外的惊喜。1507884372122','avatar_url':'http://ss.bdimg.com/static/superman/img/logo/logo_white_fe6da1ec.png','created_at':1507884371865};

        const kafkaProducer = new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            delayInterval:1000,
            producerPromise
        });
        for (var i=0;i<len;i++) {
            kafkaProducer.addData(data);
        }
        
        kafkaProducer.on(SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,function(err) {
            console.log('finish'); 
        }).on(SHKafkaProducer.EVENT_SEND_ERROR,function(err,data) {
            console.log('send error',err);
            expect(err).to.not.be.null;
            expect(data.length).to.be.equal(len);
            done();
        });
        
    });

    it('should emit error with kafkajs\' producer',function(done) {
        const producer = new KafkaJsProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            client,
        });
        producer.addData({a:1}, {},function(err) {
            expect(err).to.not.be.null;
            return done();
        });
    });
});