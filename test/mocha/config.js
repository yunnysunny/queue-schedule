// const {expect} = require('chai');
const kafka = require('kafka-node');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const client = exports.shClient = new kafka.KafkaClient({kafkaHost: KAFKA_HOST});
const producerCreater = exports.producer = new kafka.HighLevelProducer(client);
exports.producerPromise = new Promise(function(resolve,reject) {
    producerCreater.on('ready',function() {
        resolve(producerCreater);
    });

    producerCreater.on('error',function(err) {
        reject(err);
    });
});
// before(function() {
//     console.log('add event log');
//     globalEvent.on(globalEvent.EVENT_CLIENT_READY,function(kafkaHost) {
//         console.log('EVENT_CLIENT_READY',kafkaHost,'client ready');
//     });
//     globalEvent.on(globalEvent.EVENT_CLIENT_ERROR,function(kafkaHost,err) {
//         console.error('EVENT_CLIENT_ERROR',kafkaHost,err);
//     });
//     globalEvent.on(globalEvent.EVENT_CLIENT_CLOSE,function(kafkaHost) {
//         console.log('EVENT_CLIENT_CLOSE',kafkaHost,'close');
//     });
//     globalEvent.on(globalEvent.EVENT_PRODUCER_READY,function(kafkaHost) {
//         console.log('EVENT_PRODUCER_READY',kafkaHost,'producer ready');
//     });
//     globalEvent.on(globalEvent.EVENT_PRODUCER_ERROR,function(kafkaHost,err) {
//         console.error('EVENT_PRODUCER_ERROR',kafkaHost,err);
//     });
// });
