const EventEmitter = require('events');
// const kafka = require('kafka-node');
/**
 * @function PrepareMiddleware
 * 
 * @param {Object} data the data want to send
 * @returns {Boolean} whether send to kafka server
 */

/**
 * @function EncoderFunction
 * 
 * @param {any} data The input data
 * @returns {any} The output data
 */

 /**
  * @typedef {Object} RdKafkaSendOption
  * 
  * @property {String} [topicSuffix=''] The suffix of the topic name.
  * @property {Number} [partition=null] The partition number to produce to.
  * @property {Buffer} [key=null] The key associated with the message.
  * @property {Number} [timestamp=0] Timestamp to send with the message.
  * @property {Array.<{String:String}>} [headers=null]  A list of custom key value pairs that provide message metadata.
  */

 /**
  * @typedef {Object} RdKafkaProducerOption
  * 
  * @param {String} name The name of current instance.
  * @param {rdkafka.HighLevelProducer} producer 
  * @param {String=} topic The topic where you save data in it.
  * @param {PrepareMiddleware=} prepareMiddleware
  * @param {EncoderFunction} [encoder=JSON.stringify]
  * @param {String} [beforeEncodeType='object'] If the input data is not a instance of the type of `beforeEncodeType`,
  * the `encoder` function will be not called.
  */

/**
 * The class of the producer with node-rdkafka
 * @extends {EventEmitter}
 */
class RdKafkaProducer extends EventEmitter {
    /**
     * Creates an instance of RdKafkaProducer.
     * 
     * @param {RdKafkaProducerOption} option
     */
    constructor({
        name,
        topic,
        producer,
        delayInterval,
        prepareMiddleware,
        encoder = JSON.stringify,//function(data) {return data}
        beforeEncodeType = 'object'
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

        if (delayInterval) {
            // eslint-disable-next-line no-console
            console.log('\x1B[31m%s\x1B[0m', 'You should not set the parameter of delayInterval');
        }
        this._delayData = {};
        this._prepareMiddleware = null;
        if (typeof (prepareMiddleware) === 'function') {
            this._prepareMiddleware = prepareMiddleware;
        }
        this._delayTimer = null;
        this._encoder = encoder;
        this._beforeEncodeType = beforeEncodeType;

    }

    /**
     * @private
     * @param {String} zookeeperHost 
     * 
     */

    _waitProducerReady() {
        const _this = this;
        var producer = this.producer;

        _this._clientPromise = new Promise(function(resolve,reject) {
            producer.connect({}, function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                _this._clientOk = true;
                _this.emit(RdKafkaProducer.EVENT_PRODUCER_READY);

                resolve();
            });
            // producer.once('ready',function() {
            //     resolve();
            // });
            
        }).catch(function() {
            
        });
        producer.on('event.error',function(err) {
            _this.emit(RdKafkaProducer.EVENT_PRODUCER_ERROR,err);
        });
    }


    _getSendData(taskData) {
        const type = typeof(taskData);
        if (type === this._beforeEncodeType) {
            return this._encoder(taskData);
        } else {
            return taskData;
        }
    }
    /**
     * 
     * @private
     * @param {Object} taskData 
     * @param {RdKafkaSendOption} options
     * @param {Function} callback 
     */
    _sendAtOnce(taskData,options,callback) {
        const _this = this;
        const suffix = options.topicSuffix || '';
        const topic = this.topic + suffix;
        this.producer.produce(
            topic,
            options.partition || null,
            Buffer.from(this._getSendData(taskData)),
            options.key || null,
            options.timestamp || 0,
            options.headers || null,
            function(err) {
                callback(err);
                if (err) {
                    _this.emit(RdKafkaProducer.EVENT_SEND_ERROR,err,taskData);
                }
            }
        );
    }

    /**
     * Send data to kafka.
     * 
     * @param {Object} taskData 
     * @param {RdKafkaSendOption} options
     * @param {Function=} [callback=function(err) {}] 
     * @returns {Boolean} Whether the taskData is valid.
     */
    addData(taskData, options = { topicSuffix : '' }, callback = function() {}) {
        if (this._prepareMiddleware && this._prepareMiddleware(taskData) === false) {
            return false;
        }
        if (taskData === null || typeof(taskData) === 'undefined') {
            return false;
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
 RdKafkaProducer.EVENT_PRODUCER_READY = 'eventProducerReady';
/**
 * The event to notify the producer is error.
 */
RdKafkaProducer.EVENT_PRODUCER_ERROR = 'eventProducerError';

/**
 * The event emitted when an error occurs after sending data to kafka.
 */
RdKafkaProducer.EVENT_SEND_ERROR = 'eventSendError';

module.exports = RdKafkaProducer;
