const EventEmitter = require('events');
/**
 * @callback KafkaJsDoTask
 * 
 * @param {Object[]} messages
 * @param {Number} messages[].offset
 * @param {Number} messages[].timestamp
 * @param {Buffer=} messages[].key
 * @param {Buffer} messages[].value
 */


/**
 * @typedef KafkaJsConsumeOption
 * 
 * The options passed to consumer 
 * 
 * @param {String} groupId Consumer's group id
 * @param {Boolean} [fromBeginning=false] When fromBeginning is `true`, the group will use the earliest offset. If set to `false`, it will use the latest offset. The default is `false`
 * @param {Number} [sessionTimeout=30000] Timeout in milliseconds used to detect failures. The consumer sends periodic heartbeats to indicate its liveness to the broker. If no heartbeats are received by the broker before the expiration of this session timeout, then the broker will remove this consumer from the group and initiate a rebalance	
 * @param {Number} [rebalanceTimeout=60000] The maximum time that the coordinator will wait for each member to rejoin when rebalancing the group	
 * @param {String[]} [partitionAssigners=[PartitionAssigners.roundRobin]] An array of partition assignment protocols ordered by preference. 
 * @param {Number} [heartbeatInterval=3000] The expected time in milliseconds between heartbeats to the consumer coordinator. Heartbeats are used to ensure that the consumer's session stays active. The value must be set lower than session timeout
 * @param {Number} [metadataMaxAge=300000(5 minutes)] 	The period of time in milliseconds after which we force a refresh of metadata even if we haven't seen any partition leadership changes to proactively discover any new brokers or partitions	
 * @param {Boolean} [allowAutoTopicCreation=true] Allow topic creation when querying metadata for non-existent topics	
 * @param {Number} [maxBytesPerPartition=1048576(1MB)] The maximum amount of data per-partition the server will return. This size must be at least as large as the maximum message size the server allows or else it is possible for the producer to send messages larger than the consumer can fetch. If that happens, the consumer can get stuck trying to fetch a large message on a certain partition	
 * @param {Number} [minBytes=1] Minimum amount of data the server should return for a fetch request, otherwise wait up to `maxWaitTimeInMs` for more data to accumulate.
 * @param {Number} [maxBytes=10485760(10MB)] Maximum amount of bytes to accumulate in the response. Supported by Kafka >= 0.10.1.0	
 * @param {Number} [maxWaitTimeInMs=5000]	The maximum amount of time in milliseconds the server will block before answering the fetch request if there isn’t sufficient data to immediately satisfy the requirement given by `minBytes`	
 * @param {Object} [retry={ retries: 5 }] See [retry](https://kafka.js.org/docs/configuration#retry) for more information	
 * @param {Boolean} [readUncommitted=false] Configures the consumer isolation level. If `false` (default), the consumer will not return any transactional messages which were not committed.	
 * @param {Number} [maxInFlightRequests=null(no limit)] Max number of requests that may be in progress at any time. If falsey then no limit.	
 * @param {String} [rackId=null (fetch from the leader always)] Configure the "rack" in which the consumer resides to enable [follower fetching](https://kafka.js.org/docs/consuming#follower-fetching)	
 */

/**
 * @typedef KafkaJsConsumerOption
 * 
 * @param {String} name The name of current instance.
 * @param {Object} client The client instance of kafkajs.
 * @param {String} topic The topic that will be consumed.
 * @param {KafkaJsConsumeOption} consumerOption The option to create a new instance of `Kafka.ConsumerGroup`.
 * @param {Number} readCount After reading the count of `readCount`, the consumer will be paused.
 * @param {Number} pauseTime The duration of pause time, after that the consumer will be continued.
 * @param {KafkaJsDoTask} doTask The consume process function.
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
     * @param {KafkaJsConsumerOption} option
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
            consumer.subscribe({
                topic: topic, fromBeginning: consumerOption.fromBeginning
            }).catch(function(err) {
                _this.emit(KafkaJsConsumer.EVENT_CONSUMER_ERROR,err);
            });
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
     * @param {KafkaJsDoTask} doTask 
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
        }).catch(function(err) {
            _this.emit(KafkaJsConsumer.EVENT_CONSUMER_ERROR,err);
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
 * The event to notify that the consumer is ready.
 */
KafkaJsConsumer.EVENT_CONSUMER_READY = 'eventClientReady';
/**
 * The event to notify that an error ocurred in consumer.
 */
KafkaJsConsumer.EVENT_CONSUMER_ERROR = 'eventConsumerError';

module.exports = KafkaJsConsumer;
