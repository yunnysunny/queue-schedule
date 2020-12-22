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
  * @typedef {Object} SendOption
  * 
  * @property {String} [topicSuffix=''] The suffix of the topic name.
  */

 /**
  * @typedef {Object} ProducerOption
  * 
  * @param {String} name The name of current instance.
  * @param {String=} kafkaHost The host of the broker of kafka, when both of `zookeeperHost` and `kafkaHost` passed, the `kafkaHost` has higher priority.
  * @param {String=} topic The topic where you save data in it.
  * @param {Number=} delayInterval When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once.
  * @param {PrepareMiddleware=} prepareMiddleware
  */

/**
 * The class of the producer of Kafka
 * @class SHKafkaProducer
 * @extends {EventEmitter}
 */
class SHKafkaProducer extends EventEmitter {
    /**
     * Creates an instance of SHKafkaProducer.
     * 
     * @param {ProducerOption} option
     * @memberof SHKafkaProducer
     */
    constructor({
        name,
        topic,
        producerPromise,
        delayInterval,
        prepareMiddleware
    }) {
        super();
        this.name = name;
        this.producer = null;
        
        this._clientOk = false;
        if (!producerPromise) {
            throw new Error('You must give a  producer promise.');
        }
        this._producerPromise = producerPromise;
        this.topic = topic;
        if (!this.topic) {
            throw new Error('You must give the topic paramemter.');
        }
        this._waitProducerReady();
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
     * 
     * @memberof KafkaProducer
     */
    _cancleTimer() {
        if (this._delayTimer) {
            clearTimeout(this._delayTimer);
        }
    }
    /**
     * @private
     * @param {String} zookeeperHost 
     * 
     * @memberof SHKafkaProducer
     */

    _waitProducerReady() {
        // const client = new kafka.KafkaClient({kafkaHost: kafkaHost});
        const _this = this;
        this._producerPromise.then(function(producer) {
            _this.producer = producer;
            _this._clientOk = true;
        });

    }

    /**
     * @private
     * 
     * @memberof SHKafkaProducer
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
            for (var i=0;i<arrayLen;i++) {
                const topicSuffix = keys[i];
                const topicData = _delayData[topicSuffix];
                const dataArray = topicData.splice(0);
                if (dataArray.length > 0) {
                    _this.producer.send(
                        _this._createSendData(dataArray,{topicSuffix}),function(err) {
                            if (err) {
                                _this.emit(SHKafkaProducer.EVENT_SEND_ERROR,err,dataArray);
                            }
                            _this.emit(
                                SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED,
                                err,dataArray.length
                            );
                        }
                    );
                }

            }
            _this._doSendDataTimer();
        },this.delayInterval);
        

    }
    /**
     * @private
     * 
     * @param {Object} taskData 
     * @param {SendOption} options
     * @returns Array[{{topic:String,messages:Array}}]
     * @memberof SHKafkaProducer
     */
    _createSendData(taskData, options) {
        const suffix = options.topicSuffix || '';
        return [{
            topic: this.topic + suffix,
            messages: taskData,
        }];
    }
    _getSendData(taskData) {
        return typeof(taskData) === 'object' ?
        JSON.stringify(taskData):
        taskData;
    }
    /**
     * 
     * @private
     * @param {Object} taskData 
     * @param {SendOption} options
     * @param {Function} callback 
     * @memberof SHKafkaProducer
     */
    _sendAtOnce(taskData,options,callback) {
        const _this = this;
        this.producer.send(
            this._createSendData(this._getSendData(taskData), options),
            function(err,data) {
                callback(err,data);
                if (err) {
                    _this.emit(SHKafkaProducer.EVENT_SEND_ERROR,err,taskData);
                }
            }
        );
    }

    /**
     * Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i
     * 
     * @param {Object} taskData 
     * @param {SendOption} options
     * @param {Function=} [callback=function(err) {}] 
     * @returns {Boolean} Whether the taskData is valid.
     * @memberof SHKafkaProducer
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
            this._delayData[topicSuffix].push(this._getSendData(taskData));
            return true;
        }
        if (this._clientOk) {
            this._sendAtOnce(taskData,options,callback);
        } else {
            const _this = this;
            this._producerPromise.then(function() {
                setImmediate(function doNextLoop() {
                    _this._sendAtOnce(taskData,options,callback);
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
// KafkaProducer.EVENT_CLIENT_READY = 'eventClientReady';
/**
 * The event to notify that the client is error.
 */
// KafkaProducer.EVENT_CLIENT_ERROR = 'eventClientError';

/**
 * The event of notify that the client is closed.
 */
// KafkaProducer.EVENT_CLIENT_CLOSE = 'eventClientClose';

/**
 * The event to notify that a batch of messages have been sent finished.
 */
SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED = 'eventDelayMessageSendFinished';
/**
 * The event to notify that the producer is ready.
 */
// KafkaProducer.EVENT_PRODUCER_READY = 'eventProducerReady';
/**
 * The event to notify the producer is error.
 */
// KafkaProducer.EVENT_PRODUCER_ERROR = 'eventProducerError';

/**
 * The event emitted when an error occurs after sending data to kafka.
 */
SHKafkaProducer.EVENT_SEND_ERROR = 'eventSendError';

module.exports = SHKafkaProducer;
