const EventEmitter = require('events');
// const {HighLevelProducer} = require('kafka-node');
// const {getProducer} = require('./producer_pool');
/**
 * @function PrepareMiddleware
 * 
 * @param {Object} data the data want to send
 * @returns {Boolean} whether send to kafka server
 */

 /**
  * @typedef {Object} KafkaJsSendOption
  * 
  * @property {String} [topicSuffix=''] The suffix of the topic name.
  * @property {Number} [partition=null] The partition number to produce to.
  * @property {Buffer} [key=null] The key associated with the message.
  * @property {Number} [timestamp=0] Timestamp to send with the message.
  * @property {Object} [headers=null]  A list of custom key value pairs that provide message metadata.
  */

 /**
  * @typedef {Object} KafkaJsProducerOption
  * 
  * @param {String} name The name of current instance.
  * @param {client} client The client instance of kafkajs.
  * @param {String} topic The topic where you save data in it.
  * @param {Number=} delayInterval When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once.
  * @param {PrepareMiddleware=} prepareMiddleware
  * @param {Number} [acks=-1] Control the number of required acks.
  * -1 = all insync replicas must acknowledge (default)
  * 0 = no acknowledgments
  * 1 = only waits for the leader to acknowledge
  * @param {Number} [timeout=30000] The time to await a response in ms	
  * @param {String} [compression=CompressionTypes.None] Compression codec, it use none compression as default. When pass `CompressionTypes.GZIP`, it will use gzip compression.
  */

/**
 * The class of the producer of Kafka
 * @class KafkaJsProducer
 * @extends {EventEmitter}
 */
class KafkaJsProducer extends EventEmitter {
    /**
     * Creates an instance of KafkaJsProducer.
     * 
     * @param {KafkaJsProducerOption} option
     * @memberof KafkaJsProducer
     */
    constructor({
        name,
        topic,
        client,
        delayInterval,
        prepareMiddleware
    }) {
        super();
        this.name = name;
        this.producer = null;
        
        this._clientOk = false;
        if (!client) {
            throw new Error('You must give a  producer promise.');
        }
        this._client = client;
        this.topic = topic;
        if (!this.topic) {
            throw new Error('You must give the topic paramemter.');
        }
        this._readyPromise = this._waitProducerReady();
        this.producer = null;

        this.delayInterval = delayInterval;
        this._delayData = {};
        this._prepareMiddleware = null;
        if (typeof (prepareMiddleware) === 'function') {
            this._prepareMiddleware = prepareMiddleware;
        }
        this._delayTimer = null;
        if (delayInterval > 0) {
            this._doSendDataTimer();
        }
    }

    /**
     * @private
     * @param {String} zookeeperHost 
     * 
     * @memberof KafkaJsProducer
     */

    _waitProducerReady() {
        // const client = new kafka.KafkaClient({kafkaHost: kafkaHost});
        const _this = this;
        const kafka = _this._client;
        const producer = kafka.producer();

        return producer.connect().then(function() {
            _this.producer = producer;
            _this._clientOk = true;
            _this.emit(KafkaJsProducer.EVENT_PRODUCER_READY);
        }).catch(function(err) {
            this.emit(KafkaJsProducer.EVENT_PRODUCER_ERROR, err);
            throw err;
        });

    }
    _doSendBatch(needSendTopics, count) {
        const _this = this;
        _this.producer.sendBatch({topicMessages: needSendTopics}).then(function() {
            _this.emit(
                KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,
                null,count
            );
        }).catch(function(err) {
            _this.emit(KafkaJsProducer.EVENT_SEND_ERROR,err,needSendTopics);
            _this.emit(
                KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,
                err,count
            );
        });
    }

    /**
     * @private
     * 
     * @memberof KafkaJsProducer
     */
    _doSendDataTimer() {
        const _this = this;
        const _delayData = this._delayData;
        this._delayTimer = setTimeout(function delayProcess() {
            if (!_this.producer) {
                return _this._doSendDataTimer();
            }
            const keys = Object.keys(_delayData);
            const arrayLen = keys.length;
            if (arrayLen === 0) {
                return _this._doSendDataTimer();
            }
            const _needSendTopics = [];
            var count = 0;
            for (var i=0;i<arrayLen;i++) {
                const topicSuffix = keys[i];
                const topicData = _delayData[topicSuffix];
                const dataArray = topicData.splice(0);
                if (dataArray.length > 0) {
                    _needSendTopics.push({
                        topic: _this.topic + topicSuffix,
                        messages: dataArray.map(function(item) {
                            count++;
                            const {taskData, options} = item || {};
                            return _this._getSendObject(taskData, options);
                        })
                    }); 
                }
            }
            if (_needSendTopics.length === 0) {
                return _this._doSendDataTimer();
            }
            if (_this._clientOk) {
                _this._doSendBatch(_needSendTopics, count);
            } else {
                this._readyPromise.then(function() {
                    _this._doSendBatch(_needSendTopics, count);
                }).catch(function(err) {
                    _this.emit(KafkaJsProducer.EVENT_SEND_ERROR,err,_needSendTopics);
                    _this.emit(
                        KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,
                        err,count
                    );
                });
            }

            _this._doSendDataTimer();
        },this.delayInterval);
        

    }

    _getSendData(taskData) {
        return typeof(taskData) === 'object' ?
        JSON.stringify(taskData):
        taskData;
    }
    /**
     * @private
     * @param {Object|Array} taskData 
     * @param {KafkaJsSendOption} options
     * @returns {{
     * key: String| Buffer | null,
     * value: String | Buffer | null,
     * partition: Number | null,
     * timestamp: Number | null,
     * headers: Object | null
     * }}
     */
    _getSendObject(taskData, options) {

        const _this = this;
        return {
            partition: options.partition,
            key: options.key,
            headers: options.headers,
            timestamp: options.timestamp,
            value: _this._getSendData(taskData)
        };
    }
    /**
     * 
     * @private
     * @param {Object} sendData 
     * @param {KafkaJsSendOption} options
     * @param {Function} callback 
     * @memberof KafkaJsProducer
     */
    _sendAtOnce(sendData,options,callback) {
        const _this = this;
        const suffix = options.topicSuffix || '';
        if (!Array.isArray(sendData)) {
            sendData = [sendData];
        }

        this.producer.send({
            topic: this.topic + suffix,
            messages: sendData,
        }).then(function() {
            callback(null,sendData);
        }).catch(function(err) {
            callback(err);
            _this.emit(KafkaJsProducer.EVENT_SEND_ERROR,err,sendData);
        });
    }

    /**
     * Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i
     * 
     * @param {Object} taskData 
     * @param {KafkaJsSendOption} options
     * @param {Function=} [callback=function(err) {}] 
     * @returns {Boolean} Whether the taskData need to send.
     * @memberof KafkaJsProducer
     */
    addData(taskData, options = { topicSuffix : '' }, callback = function() {}) {
        if (this._prepareMiddleware && this._prepareMiddleware(taskData) === false) {
            return false;
        }
        const topicSuffix = options.topicSuffix || '';
        if (this.delayInterval > 0) {
            if (!this._delayData[topicSuffix]) {
                this._delayData[topicSuffix] = [];
            }
            this._delayData[topicSuffix].push({taskData, options});
            return true;
        }
        const sendData = [this._getSendObject(taskData, options)];
        if (this._clientOk) {
            this._sendAtOnce(sendData,options,callback);
        } else {
            const _this = this;
            this._readyPromise.then(function() {
                setImmediate(function doNextLoop() {
                    _this._sendAtOnce(sendData,options,callback);
                });
            }).catch(function(err) {
                callback(err);
            });
        }
        
        return true;
    }

}
/**
 * The event to notify that the client is ready.
 */
// KafkaJsProducer.EVENT_CLIENT_READY = 'eventClientReady';
/**
 * The event to notify that the client is error.
 */
// KafkaJsProducer.EVENT_CLIENT_ERROR = 'eventClientError';

/**
 * The event of notify that the client is closed.
 */
// KafkaJsProducer.EVENT_CLIENT_CLOSE = 'eventClientClose';

/**
 * The event to notify that a batch of messages have been sent finished.
 */
KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED = 'eventDelayMessageSendFinished';
/**
 * The event to notify that the producer is ready.
 */
KafkaJsProducer.EVENT_PRODUCER_READY = 'eventProducerReady';
/**
 * The event to notify the producer is error.
 */
KafkaJsProducer.EVENT_PRODUCER_ERROR = 'eventProducerError';

/**
 * The event emitted when an error occurs after sending data to kafka.
 */
KafkaJsProducer.EVENT_SEND_ERROR = 'eventSendError';

module.exports = KafkaJsProducer;
