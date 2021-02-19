// const kafka = require('kafka-node');
const { Kafka } = require('kafkajs');
const slogger = require('node-slogger');
const { KafkaJsConsumer } = require('../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const TOPIC_NAME = process.env.TOPIC_NAME;

const client =  new Kafka({
    brokers: KAFKA_HOST.split(',')
});
new KafkaJsConsumer({
    name: 'kafka',
    client,
    topic: TOPIC_NAME,
    consumerOption: {
        groupId: 'kafkajs',
        fromBeginning: true
    },
    doTask:function(messages,callback) {//console.log(messages);
            // const value = messages[0].value;
            // let data = null;
            // try {
            //     data = JSON.parse(value);
            // } catch (e) {
            //     hasDone = true;
            //     console.error('parse message error',e);
            //     return done('parse message error');
            // }
            slogger.info('recieve data',messages.length);

            
        callback();
    },
    readCount : 10,
    pauseTime : 5,
}).on(KafkaJsConsumer.EVENT_CONSUMER_ERROR,function(err) {
    console.error('consumer error',err);
}).on(KafkaJsConsumer.EVENT_CONSUMER_READY,function() {
    console.log('the consumer is ready');
});