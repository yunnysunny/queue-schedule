// const kafka = require('kafka-node');
const Kafka = require('node-rdkafka');
const slogger = require('node-slogger');
const KAFKA_HOST = process.env.KAFKA_PEERS;
const rand = 55;
const FIST_DATA = {a:rand,b:2};
const TOPIC_NAME1 = 'topic.rdkafka.time';
//queue.buffering.max.ms 0.5
//queue.buffering.max.messages	100000

const producerRd = new Kafka.HighLevelProducer({
    'metadata.broker.list': KAFKA_HOST,
    'linger.ms':0.1,
    'queue.buffering.max.ms': 500,
    'queue.buffering.max.messages':1000,
    debug: 'all'
});
producerRd.on('event.error',function(err) {
    slogger.error('producer error',err);
});
producerRd.on('event.log',function(log) {
        slogger.debug('producer log',log);
});
function sendData() {
  producerRd.produce(
    TOPIC_NAME1,null,Buffer.from(JSON.stringify(FIST_DATA)),null,0,
    function(err,data) {
        if (err) {
            slogger.error(err);
        }
    }
  );
}
producerRd.once('ready',function() {
  setInterval(function() {
    sendData();
  }, 1000);
});
producerRd.connect();