const EventEmitter = require('events');
const kafka = require('kafka-node');

const producerPool = new Map();
class GlobalProducerEvent extends EventEmitter {};
/**
 * @namespace {EventEmitter} globalEvent
 * @extends EventEmitter
 */
const globalEvent = new GlobalProducerEvent();
/**
 * The event to notify that the client is ready.
 * @memberof globalEvent
 */
const EVENT_CLIENT_READY = globalEvent.EVENT_CLIENT_READY = 'eventClientReady';
/**
 * The event to notify that the client is error.
 * @memberof globalEvent
 */
const EVENT_CLIENT_ERROR = globalEvent.EVENT_CLIENT_ERROR = 'eventClientError';

/**
 * The event of notify that the client is closed.
 * @memberof globalEvent
 */
const EVENT_CLIENT_CLOSE = globalEvent.EVENT_CLIENT_CLOSE = 'eventClientClose';

/**
 * The event to notify that the producer is ready.
 * @memberof globalEvent
 */
const EVENT_PRODUCER_READY = globalEvent.EVENT_PRODUCER_READY = 'eventProducerReady';

/**
 * The event to notify the producer is error.
 * @memberof globalEvent
 */
const EVENT_PRODUCER_ERROR = globalEvent.EVENT_PRODUCER_ERROR = 'eventProducerError';

exports.globalEvent = globalEvent;
/**
 * The class to init kafka producer.
 * 
 * @class ProducerWrapper
 * @extends {EventEmitter}
 * @ignore
 */
class ProducerWrapper extends EventEmitter {
    constructor(kafkaHost) {
        super();
        this.producer = null;
        this._init(kafkaHost);
    }
    _init(kafkaHost) {
        const client = new kafka.KafkaClient({kafkaHost: kafkaHost});
        const _this = this;
        this.initPromise = new Promise(function(resolve,reject) {
            client.on('ready',function() {
                globalEvent.emit(EVENT_CLIENT_READY,kafkaHost);
                // _this.emit(EVENT_CLIENT_READY);
            });
            client.on('error',function(err) {
                // _this._cancleTimer();
                // _this._clientOk = false;
                reject(err);
                globalEvent.emit(EVENT_CLIENT_ERROR,kafkaHost,err);
                // return ;_this.emit(EVENT_CLIENT_ERROR,err);
            });
            client.on('close',function() {
                globalEvent.emit(EVENT_CLIENT_CLOSE,kafkaHost);
                reject(new Error('The client '+ kafkaHost + ' close'));
            });
            const producer =  new kafka.HighLevelProducer(client);
            producer.on('ready', function producerReady() {
    
                _this.producer = producer;
                // _this._clientOk = true;
                resolve();
                globalEvent.emit(EVENT_PRODUCER_READY,kafkaHost);
                // return _this.emit(EVENT_PRODUCER_READY);
                
            }); 
            producer.on('error',function producerError(err) {
                // _this._cancleTimer();
                // _this._clientOk = false;
                reject(err);
                globalEvent.emit(EVENT_PRODUCER_ERROR,kafkaHost,err);
                // return _this.emit(EVENT_PRODUCER_ERROR,err);
            });
        });
        
    }
}



/**
 * Get an instance of producer.
 * 
 * @ignore
 * @param {String} kafkaHost
 * @returns {ProducerWrapper}
 */
exports.getProducer = function(kafkaHost) {
    const clientOld = producerPool.get(kafkaHost);
    if (clientOld) {
        return clientOld;
    }
    const newProducer = new ProducerWrapper(kafkaHost);
    producerPool.set(kafkaHost,newProducer);
    return newProducer;
};