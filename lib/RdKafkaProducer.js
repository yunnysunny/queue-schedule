const EventEmitter = require('events');
// const kafka = require('kafka-node');
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
  * @param {rdkafka.HighLevelProducer} producer 
  * @param {String=} topic The topic where you save data in it.
  * @param {Number=} [delayInterval=500] When pass this parameter, messages will fore to flush to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once.
  * @param {PrepareMiddleware=} prepareMiddleware
  */

/**
 * The class of the producer of Kafka
 * @class RdKafkaProducer
 * @extends {EventEmitter}
 */
class RdKafkaProducer extends EventEmitter {
    /**
     * Creates an instance of RdKafkaProducer.
     * 
     * @param {ProducerOption} option
     * @memberof RdKafkaProducer
     */
    constructor({
        name,
        topic,
        producer,
        delayInterval = 500,
        prepareMiddleware
    }) {
        super();
        this.name = name;
        this.producer = producer;
        this._clientPromise = null;
        this._clientOk = false;

        this.topic = topic;
        if (!this.topic) {
            throw new Error('You must give the topic paramemter.');
        }
        this._waitProducerReady();

        this.delayInterval = delayInterval;
        this._delayData = {};
        this._prepareMiddleware = null;
        if (typeof (prepareMiddleware) === 'function') {
            this._prepareMiddleware = prepareMiddleware;
        }
        this._delayTimer = null;
        if (delayInterval) {
            this._doSendDataTimer();
        }

    }
    /**
     * @private
     * 
     * @memberof RdKafkaProducer
     */
    _cancleTimer() {
        if (this._delayTimer) {
            clearTimeout(this._delayTimer);
        }
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
                    // _this._sendAtOnce(dataArray, {topicSuffix}, function() {});
                    const topic = _this.topic + topicSuffix;
                    _this.producer.produce(
                        topic,null,Buffer.from(_this._getSendData(dataArray)),null,0,
                        function(err) {
                            if (err) {
                                _this.emit(RdKafkaProducer.EVENT_SEND_ERROR,err,dataArray);
                            }
                        }
                    );
                }
            }
            _this._doSendDataTimer();
        });
    }
    /**
     * @private
     * @param {String} zookeeperHost 
     * 
     * @memberof RdKafkaProducer
     */

    _waitProducerReady() {
        const _this = this;
        var producer = this.producer;
        producer.connect();
        _this._clientPromise = new Promise(function(resolve,reject) {
            producer.once('ready',function() {
                resolve();
                // const delayInterval = _this.delayInterval;
                // if (!delayInterval) {
                //     return;
                // }
                // setInterval(function flushRdQueue() {
                //     producer.flush();
                // },delayInterval);
            });
        }).catch(function() {
            
        });
        producer.on('event.error',function(err) {
            _this.emit(RdKafkaProducer.EVENT_PRODUCER_ERROR,err);
        });
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
     * @memberof RdKafkaProducer
     */
    _sendAtOnce(taskData,options,callback) {
        const _this = this;
        const suffix = options.topicSuffix || '';
        const topic = this.topic + suffix;
        this.producer.produce(
            topic,null,Buffer.from(this._getSendData(taskData)),null,0,
            function(err,data) {
                callback(err,data);
                if (err) {
                    _this.emit(RdKafkaProducer.EVENT_SEND_ERROR,err,taskData);
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
     * @memberof RdKafkaProducer
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
            callback(null);
            return true;
        }
        if (this._clientOk) {
            this._sendAtOnce(taskData,options,callback);
        } else {
            const _this = this;
            this._clientPromise.then(function() {
                _this._sendAtOnce(taskData,options,callback);
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
RdKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED = 'eventDelayMessageSendFinished';
/**
 * The event to notify that the producer is ready.
 */
// KafkaProducer.EVENT_PRODUCER_READY = 'eventProducerReady';
/**
 * The event to notify the producer is error.
 */
RdKafkaProducer.EVENT_PRODUCER_ERROR = 'eventProducerError';

/**
 * The event emitted when an error occurs after sending data to kafka.
 */
RdKafkaProducer.EVENT_SEND_ERROR = 'eventSendError';

module.exports = RdKafkaProducer;
