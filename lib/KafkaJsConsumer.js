const EventEmitter = require('events');
/**
 * @callback DoTask
 * 
 * @param {Object[]} messages
 */


/**
 * @typedef ConsumerOption
 * 
 * The options passed to [kafka.ConsumerGroup](https://github.com/SOHU-Co/kafka-node#consumergroup) 
 * 
 * @param {String=} groupId it will use KafkaConsumerOption.groupId in default.
 * @param {Number=} [fetchMaxBytes=1024*1024]
 * @param {Number} [sessionTimeout=15000]
 * @param {String[]} [protocol=['roundrobin']] An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for built ins
 * @param {String} [fromOffset=earliest] Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved) quivalent to Java client's auto.offset.reset
 */

/**
 * @typedef KafkaConsumerOption
 * 
 * @param {String} name The name of current instance.
 * @param {Object} client The client instance of kafkajs.
 * @param {String} topic The topic that will be consumed.
 * @param {ConsumerOption=} consumerOption The option to create a new instance of `Kafka.ConsumerGroup`.
 * @param {Number} readCount After reading the count of `readCount`, the consumer will be paused.
 * @param {Number} pauseTime The duration of pause time, after that the consumer will be continued.
 * @param {DoTask} doTask The consume process function.
 * @param {Number} idleCheckInter The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. 
 */

/**
 * The class of KafkaConsumer
 * @class KafkaJsConsumer
 * @extends {EventEmitter}
 */

class KafkaJsConsumer extends EventEmitter {
    
    /**
     * Creates an instance of KafkaConsumer. It will call the function of #consumer inner.
     * 
     * @param {KafkaConsumerOption} option
     * @memberof KafkaJsConsumer
     */
    constructor({
        name,
        client,
        topic,
        consumerOption = {},
        doTask,
        readCount = 100,
        pauseTime = 500,
        idleCheckInter = 1000 * 10,
        
    }) {
        super();
        this.name = name;
        this._readCount = readCount;
        this._consumer = null;
        if (!topic ||  !consumerOption) {
            throw new Error('The parameters of  topics and consumerOption must be given.');
        }
        if (!client) {
            throw new Error('The parameter of client must be given.');
        }
        this._client = client;
        this._consumerOption = consumerOption;
        
        this._pauseTime = pauseTime;
        this._doTask = doTask;
        this._lastFinishedTime = 0;
        this._idleCheckInter = idleCheckInter;
        this._messages = [];
        this._init(topic,consumerOption);
    }

    _init(topic,consumerOption) {
        // const client = new kafka.Client(zookeeperHost);
        const _this = this;

        const consumer = this._consumer = this._client.consumer({groupId: consumerOption.groupId});
        consumer.connect().then(function() {
            _this.emit(KafkaJsConsumer.EVENT_CONSUMER_READY);
            consumer.subscribe({topic: topic, fromBeginning: consumerOption.fromBeginning});
            _this._consume(_this._doTask);
        }).catch(function(err) {
            _this.emit(KafkaJsConsumer.EVENT_CONSUMER_ERROR,err);
        });

    }

    _continue() {
        const _this = this;
        setTimeout(function resume() {
            _this._consumer.resume();
        }, this._pauseTime);
    }
    /**
     * The consume function.
     * Do not call this function manual!
     * 
     * @param {DoTask} doTask 
     * @memberof KafkaJsConsumer
     */
    _consume(doTask) {
        let messages = this._messages;
        const consumer = this._consumer;
        const count = this._readCount;
        const _this = this;
        const consumerOption = this._consumerOption;
        consumer.run({
            ...consumerOption,
            eachMessage: function({message}) {
                _this._lastFinishedTime = Date.now();
                if (message.offset % count === 0) {
                    consumer.pause();
                    messages.push(message);
                    doTask(messages.splice(0), function () {
                        _this._continue();
                    });
                } else {
                    messages.push(message);
                }
            }
        });



        setInterval(function clear() {
            const idle = new Date().getTime() - _this._lastFinishedTime;
            if ( idle > 1000 && messages.length > 0) {
                consumer.pause();
                doTask(messages.splice(0), function() {
                    _this._continue();
                });
            }
        }, this._idleCheckInter);
    }
}
/**
 * The event to notify that the client is ready.
 */
KafkaJsConsumer.EVENT_CONSUMER_READY = 'eventClientReady';
/**
 * The event to notify that an error ocurred in consumer.
 */
KafkaJsConsumer.EVENT_CONSUMER_ERROR = 'eventConsumerError';

module.exports = KafkaJsConsumer;
