const EventEmitter = require('events');
/**
 * @callback DoTask
 * 
 * @param {Object[]} messages
 */


/**
 * @typedef ConsumerOption
 * 
 * The options passed to [rdkafka.KafkaConsumer](https://github.com/edenhill/librdkafka/blob/v1.2.2/CONFIGURATION.md) 
 * 
 */

/**
 * @typedef KafkaConsumerOption
 * 
 * @param {String} name The name of current instance.
 * @param {String=} kafkaHost The host of the broker of kafka.
 * @param {String[]} topics The topics that will be consumed.
 * @param {rdkafka.KafkaConsumer} consumer The instance of `rdkafka.KafkaConsumer`.
 * @param {Number} readCount After reading the count of `readCount`, the consumer will be paused.
 * @param {Number} pauseTime The duration of pause time, after that the consumer will be continued.
 * @param {DoTask} doTask The consume process function.
 * @param {Number} idleCheckInter The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. 
 */

/**
 * The class of RdKafkaConsumer
 * @class RdKafkaConsumer
 * @extends {EventEmitter}
 */

class RdKafkaConsumer extends EventEmitter {
    
    /**
     * Creates an instance of RdKafkaConsumer. It will call the function of #consumer inner.
     * 
     * @param {KafkaConsumerOption} option
     * @memberof RdKafkaConsumer
     */
    constructor({
        name,
        topics,
        consumer,
        doTask,
        readCount = 100,
        pauseTime = 500,
        idleCheckInter = 1000 * 10,
    }) {
        super();
        this.name = name;
        this.readCount = readCount;
        this.consumer = consumer;
        if (!topics) {
            throw new Error('The parameters of  topics must be given.');
        }
        
        
        this.pauseTime = pauseTime;
        this._doTask = doTask;
        this.lastFinishedTime = 0;
        this.idleCheckInter = idleCheckInter;
        this.messages = [];
        this._init(topics);
    }

    _init(topics) {
        const _this = this;
        const consumer = this.consumer;
        consumer.connect();
        this._consume(_this._doTask);
        consumer.once('ready', function() {
            consumer.subscribe(topics);
            _this._continue();
            
            _this.emit(RdKafkaConsumer.EVENT_CLIENT_READY);
        });
        consumer.on('error',function(err) {
            _this.emit(RdKafkaConsumer.EVENT_CONSUMER_ERROR,err);
        });
        consumer.on('event.log', function (log) {
            _this.emit(RdKafkaConsumer.EVENT_LOG,log);
        });
    }

    _continue() {
        const _this = this;
        setTimeout(function resume() {
            _this.consumer.consume(_this.readCount);
        }, this.pauseTime);
    }
    /**
     * The consume function.
     * Do not call this function manual!
     * 
     * @param {DoTask} doTask 
     * @memberof RdKafkaConsumer
     */
    _consume(doTask) {
        const messages = this.messages;
        const consumer = this.consumer;
        const count = this.readCount;
        const _this = this;

        consumer.on('data', function(message) {
            _this.lastFinishedTime = Date.now();
            if (!message) {
                _this.emit(RdKafkaConsumer.EVENT_CONSUMER_ERROR, new Error('empty message'));
                return;
            }
            messages.push(message);
            if (message.offset % count === 0) {
                doTask(messages.splice(0), function () {
                    _this._continue();
                });
            } else {
                //
            }
        });

        setInterval(function clear() {
            const idle = new Date().getTime() - _this.lastFinishedTime;
            if ( idle > 1000) {
                if (messages.length > 0) {
                    doTask(messages.splice(0), function() {
                        _this._continue();
                    });
                } else {
                    _this._continue();
                }
            }
        }, this.idleCheckInter);
    }
}
/**
 * The event to notify that the client is ready.
 */
RdKafkaConsumer.EVENT_CLIENT_READY = 'eventClientReady';
/**
 * The event to notify that the client is error.
 */
RdKafkaConsumer.EVENT_CLIENT_ERROR = 'eventClientError';
/**
 * The event to notify that an error ocurred in consumer.
 */
RdKafkaConsumer.EVENT_CONSUMER_ERROR = 'eventConsumerError';

/**
 * The event to notify `event.log` from rdkafka.
 */
RdKafkaConsumer.EVENT_LOG = 'eventConsumerLog';

module.exports = RdKafkaConsumer;
