const Kafka = require('node-rdkafka');
const slogger = require('node-slogger');
const {RdKafkaConsumer } = require('../index');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const rand = 55;
const FIST_DATA = { a: rand, b: 2 };
const TOPIC_NAME1 = 'topic.rdkafka.console';

const consumer = new Kafka.KafkaConsumer({
    'metadata.broker.list': KAFKA_HOST,
    'group.id': 'test-rdkafka-0',
    'auto.offset.reset': 'earliest',
    'socket.keepalive.enable': true,
    'socket.nagle.disable': true,
    'enable.auto.commit': true,
    'fetch.wait.max.ms': 50,
    'fetch.error.backoff.ms': 5,
    'queued.max.messages.kbytes': 1024 * 10,
    debug: 'all'
});
let hasDone = false;
new RdKafkaConsumer({
    name: 'kafka',
    consumer,
    topics: [TOPIC_NAME1],

    doTask: function (messages, callback) {
        slogger.trace(messages);
        if (!hasDone) {
            const value = messages[0].value.toString('utf8');
            let data = null;
            try {
                data = JSON.parse(value);
            } catch (e) {
                hasDone = true;
                slogger.error('parse message error', e);
                return;
            }
            slogger.trace('recieve data', data);
            if (!hasDone) {
                hasDone = true;
            }

        }
        callback();
    },
    readCount: 1,
    pauseTime: 500,
    idleCheckInter: 10 * 1000
}).on(RdKafkaConsumer.EVENT_CONSUMER_ERROR, function (err) {
    slogger.error('consumer error', err);
    hasDone = true;
}).on(RdKafkaConsumer.EVENT_CLIENT_READY, function () {
    slogger.info('the consumer client is ready');
}).on(RdKafkaConsumer.EVENT_LOG, function (log) {
    if (process.env.TRAVIS) {
        slogger.trace(JSON.stringify(log));
    }
});