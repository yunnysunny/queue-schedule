# Queue Shedule

[![NPM version](https://img.shields.io/npm/v/queue-schedule.svg?style=flat-square)](https://www.npmjs.com/package/queue-schedule)
[![Build status](https://travis-ci.org/e174596549/queue-schedule.svg?branch=master)](https://travis-ci.org/e174596549/queue-schedule)

Kafka is a high avaliable message queue, but it lacks of consuming message with a slow speed. Some of task with no need to finish it at none, and we want to complete it with a small cost. This is just the reason why we develop `Queue Shedule`.

## Install

```npm install queue-schedule```

## How to use

### Use kafka-node
A basic example is showed as follows:

```javascript
const kafka = require('kafka-node');
const {expect} = require('chai');
const {SHKafkaProducer,SHKafkaConsumer} = require('queue-schedule');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const FIST_DATA = {a:1,b:2};
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.1';
const client = new kafka.KafkaClient({kafkaHost: KAFKA_HOST});
const producerCreater = new kafka.HighLevelProducer(client);
const producerPromise = new Promise(function(resolve,reject) {
    producerCreater.on('ready',function() {
        resolve(producerCreater);
    });

    producerCreater.on('error',function(err) {
        reject(err);
    });
});

let hasDone = false;
new SHKafkaConsumer({
    name: 'kafka',
    topics:[TOPIC_NAME1],
    consumerOption: {
        kafkaHost: KAFKA_HOST,
        fromOffset: 'earliest',
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
                return;
            }
            expect(data).to.have.property('a').and.equal(1);
            console.log('recieve data',data);
            hasDone = true;
        }
        callback();
    },
    readCount : 1,
    pauseTime : 500,
    idleCheckInter: 10 * 1000
}).on(KafkaConsumer.EVENT_CONSUMER_ERROR,function(err) {
    console.error('consumer error',err);
    hasDone = true;
    
});


new SHKafkaProducer({
    name : SCHEDULE_NAME1,
    topic: TOPIC_NAME1,
    producerPromise
}).addData(FIST_DATA,{},function(err) {
    if (err) {
        console.error('write to queue error',err);
        return ;
    }
    console.info('write to kafka finished');
});
```

### Use rdkafka

```javascript
const Kafka = require('node-rdkafka');
const {RdKafkaProducer,RdKafkaConsumer} = require('queue-schedule');
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
});


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
    
    doTask:function(messages,callback) {
        slogger.trace(messages);
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
```
## API

For detail usage, see the document online [here](https://yunnysunny.github.io/queue-schedule).

## Known issue

1. For the library of `kafka-node` is not stable, we suggest you using the `rdkafka` library. In othter words, you'd better use `RdKafkaProducer` and `RdKafkaConsumer` instead of `SHKafkaProducer` and `SHKafkaConsumer`.

## License

[MIT](LICENSE)
