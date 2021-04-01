## Classes

<dl>
<dt><a href="#KafkaJsConsumer">KafkaJsConsumer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of consumer with kafka-js</p>
</dd>
<dt><a href="#KafkaJsProducer">KafkaJsProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of the producer with kafka-js</p>
</dd>
<dt><a href="#RdKafkaConsumer">RdKafkaConsumer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of consumer with node-rdkafka</p>
</dd>
<dt><a href="#RdKafkaProducer">RdKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of the producer with node-rdkafka</p>
</dd>
<dt><a href="#SHKafkaConsumer">SHKafkaConsumer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of consumer with kafka-node</p>
</dd>
<dt><a href="#SHKafkaProducer">SHKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The class of the producer with kafka-node</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#EncoderFunction">EncoderFunction(data)</a> ⇒ <code>any</code></dt>
<dd></dd>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#KafkaJsDoTask">KafkaJsDoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#KafkaJsConsumeOption">KafkaJsConsumeOption</a></dt>
<dd></dd>
<dt><a href="#KafkaJsConsumerOption">KafkaJsConsumerOption</a></dt>
<dd></dd>
<dt><a href="#KafkaJsSendOption">KafkaJsSendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#KafkaJsProducerOption">KafkaJsProducerOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DoTask">DoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ConsumerOption">ConsumerOption</a></dt>
<dd></dd>
<dt><a href="#RdKafkaConsumerOption">RdKafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#RdKafkaSendOption">RdKafkaSendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#RdKafkaProducerOption">RdKafkaProducerOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DoTask">DoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#SHKafkaConsumerOption">SHKafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#SHKafkaConsumerOption">SHKafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#SHKafkaSendOption">SHKafkaSendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SHKafkaProducerOption">SHKafkaProducerOption</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="KafkaJsConsumer"></a>

## KafkaJsConsumer ⇐ <code>EventEmitter</code>
The class of consumer with kafka-js

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [KafkaJsConsumer](#KafkaJsConsumer) ⇐ <code>EventEmitter</code>
    * [new KafkaJsConsumer(option)](#new_KafkaJsConsumer_new)
    * [.EVENT_CONSUMER_READY](#KafkaJsConsumer.EVENT_CONSUMER_READY)
    * [.EVENT_CONSUMER_ERROR](#KafkaJsConsumer.EVENT_CONSUMER_ERROR)

<a name="new_KafkaJsConsumer_new"></a>

### new KafkaJsConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaJsConsumerOption</code>](#KafkaJsConsumerOption) | 

<a name="KafkaJsConsumer.EVENT_CONSUMER_READY"></a>

### KafkaJsConsumer.EVENT\_CONSUMER\_READY
The event to notify that the consumer is ready.

**Kind**: static property of [<code>KafkaJsConsumer</code>](#KafkaJsConsumer)  
<a name="KafkaJsConsumer.EVENT_CONSUMER_ERROR"></a>

### KafkaJsConsumer.EVENT\_CONSUMER\_ERROR
The event to notify that an error ocurred in consumer.

**Kind**: static property of [<code>KafkaJsConsumer</code>](#KafkaJsConsumer)  
<a name="KafkaJsProducer"></a>

## KafkaJsProducer ⇐ <code>EventEmitter</code>
The class of the producer with kafka-js

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [KafkaJsProducer](#KafkaJsProducer) ⇐ <code>EventEmitter</code>
    * [new KafkaJsProducer(option)](#new_KafkaJsProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#KafkaJsProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_PRODUCER_READY](#KafkaJsProducer.EVENT_PRODUCER_READY)
        * [.EVENT_PRODUCER_ERROR](#KafkaJsProducer.EVENT_PRODUCER_ERROR)
        * [.EVENT_SEND_ERROR](#KafkaJsProducer.EVENT_SEND_ERROR)

<a name="new_KafkaJsProducer_new"></a>

### new KafkaJsProducer(option)
Creates an instance of KafkaJsProducer.


| Param | Type |
| --- | --- |
| option | [<code>KafkaJsProducerOption</code>](#KafkaJsProducerOption) | 

<a name="KafkaJsProducer+addData"></a>

### kafkaJsProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData need to send.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>KafkaJsSendOption</code>](#KafkaJsSendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### KafkaJsProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="KafkaJsProducer.EVENT_PRODUCER_READY"></a>

### KafkaJsProducer.EVENT\_PRODUCER\_READY
The event to notify that the producer is ready.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="KafkaJsProducer.EVENT_PRODUCER_ERROR"></a>

### KafkaJsProducer.EVENT\_PRODUCER\_ERROR
The event to notify the producer is error.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="KafkaJsProducer.EVENT_SEND_ERROR"></a>

### KafkaJsProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="RdKafkaConsumer"></a>

## RdKafkaConsumer ⇐ <code>EventEmitter</code>
The class of consumer with node-rdkafka

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [RdKafkaConsumer](#RdKafkaConsumer) ⇐ <code>EventEmitter</code>
    * [new RdKafkaConsumer(option)](#new_RdKafkaConsumer_new)
    * [.EVENT_CLIENT_READY](#RdKafkaConsumer.EVENT_CLIENT_READY)
    * [.EVENT_CLIENT_ERROR](#RdKafkaConsumer.EVENT_CLIENT_ERROR)
    * [.EVENT_CONSUMER_ERROR](#RdKafkaConsumer.EVENT_CONSUMER_ERROR)
    * [.EVENT_LOG](#RdKafkaConsumer.EVENT_LOG)

<a name="new_RdKafkaConsumer_new"></a>

### new RdKafkaConsumer(option)
Creates an instance of RdKafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>RdKafkaConsumerOption</code>](#RdKafkaConsumerOption) | 

<a name="RdKafkaConsumer.EVENT_CLIENT_READY"></a>

### RdKafkaConsumer.EVENT\_CLIENT\_READY
The event to notify that the client is ready.

**Kind**: static property of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  
<a name="RdKafkaConsumer.EVENT_CLIENT_ERROR"></a>

### RdKafkaConsumer.EVENT\_CLIENT\_ERROR
The event to notify that the client is error.

**Kind**: static property of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  
<a name="RdKafkaConsumer.EVENT_CONSUMER_ERROR"></a>

### RdKafkaConsumer.EVENT\_CONSUMER\_ERROR
The event to notify that an error ocurred in consumer.

**Kind**: static property of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  
<a name="RdKafkaConsumer.EVENT_LOG"></a>

### RdKafkaConsumer.EVENT\_LOG
The event to notify `event.log` from rdkafka.

**Kind**: static property of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  
<a name="RdKafkaProducer"></a>

## RdKafkaProducer ⇐ <code>EventEmitter</code>
The class of the producer with node-rdkafka

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [RdKafkaProducer](#RdKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new RdKafkaProducer(option)](#new_RdKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#RdKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#RdKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_PRODUCER_READY](#RdKafkaProducer.EVENT_PRODUCER_READY)
        * [.EVENT_PRODUCER_ERROR](#RdKafkaProducer.EVENT_PRODUCER_ERROR)
        * [.EVENT_SEND_ERROR](#RdKafkaProducer.EVENT_SEND_ERROR)

<a name="new_RdKafkaProducer_new"></a>

### new RdKafkaProducer(option)
Creates an instance of RdKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>RdKafkaProducerOption</code>](#RdKafkaProducerOption) | 

<a name="RdKafkaProducer+addData"></a>

### rdKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka.

**Kind**: instance method of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>RdKafkaSendOption</code>](#RdKafkaSendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="RdKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### RdKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="RdKafkaProducer.EVENT_PRODUCER_READY"></a>

### RdKafkaProducer.EVENT\_PRODUCER\_READY
The event to notify that the producer is ready.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="RdKafkaProducer.EVENT_PRODUCER_ERROR"></a>

### RdKafkaProducer.EVENT\_PRODUCER\_ERROR
The event to notify the producer is error.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="RdKafkaProducer.EVENT_SEND_ERROR"></a>

### RdKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="SHKafkaConsumer"></a>

## SHKafkaConsumer ⇐ <code>EventEmitter</code>
The class of consumer with kafka-node

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [SHKafkaConsumer](#SHKafkaConsumer) ⇐ <code>EventEmitter</code>
    * [new SHKafkaConsumer(option)](#new_SHKafkaConsumer_new)
    * [.EVENT_CLIENT_READY](#SHKafkaConsumer.EVENT_CLIENT_READY)
    * [.EVENT_CLIENT_ERROR](#SHKafkaConsumer.EVENT_CLIENT_ERROR)
    * [.EVENT_CONSUMER_ERROR](#SHKafkaConsumer.EVENT_CONSUMER_ERROR)

<a name="new_SHKafkaConsumer_new"></a>

### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>SHKafkaConsumerOption</code>](#SHKafkaConsumerOption) | 

<a name="SHKafkaConsumer.EVENT_CLIENT_READY"></a>

### SHKafkaConsumer.EVENT\_CLIENT\_READY
The event to notify that the client is ready.

**Kind**: static property of [<code>SHKafkaConsumer</code>](#SHKafkaConsumer)  
<a name="SHKafkaConsumer.EVENT_CLIENT_ERROR"></a>

### SHKafkaConsumer.EVENT\_CLIENT\_ERROR
The event to notify that the client is error.

**Kind**: static property of [<code>SHKafkaConsumer</code>](#SHKafkaConsumer)  
<a name="SHKafkaConsumer.EVENT_CONSUMER_ERROR"></a>

### SHKafkaConsumer.EVENT\_CONSUMER\_ERROR
The event to notify that an error ocurred in consumer.

**Kind**: static property of [<code>SHKafkaConsumer</code>](#SHKafkaConsumer)  
<a name="SHKafkaProducer"></a>

## SHKafkaProducer ⇐ <code>EventEmitter</code>
The class of the producer with kafka-node

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [SHKafkaProducer](#SHKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new SHKafkaProducer(option)](#new_SHKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#SHKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_SEND_ERROR](#SHKafkaProducer.EVENT_SEND_ERROR)

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer(option)
Creates an instance of SHKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>SHKafkaProducerOption</code>](#SHKafkaProducerOption) | 

<a name="SHKafkaProducer+addData"></a>

### shKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SHKafkaSendOption</code>](#SHKafkaSendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### SHKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.EVENT_SEND_ERROR"></a>

### SHKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="PrepareMiddleware"></a>

## PrepareMiddleware(data) ⇒ <code>Boolean</code>
**Kind**: global function  
**Returns**: <code>Boolean</code> - whether send to kafka server  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data want to send |

<a name="PrepareMiddleware"></a>

## PrepareMiddleware(data) ⇒ <code>Boolean</code>
**Kind**: global function  
**Returns**: <code>Boolean</code> - whether send to kafka server  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data want to send |

<a name="EncoderFunction"></a>

## EncoderFunction(data) ⇒ <code>any</code>
**Kind**: global function  
**Returns**: <code>any</code> - The output data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | The input data |

<a name="PrepareMiddleware"></a>

## PrepareMiddleware(data) ⇒ <code>Boolean</code>
**Kind**: global function  
**Returns**: <code>Boolean</code> - whether send to kafka server  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data want to send |

<a name="KafkaJsDoTask"></a>

## KafkaJsDoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 
| messages[].offset | <code>Number</code> | 
| messages[].timestamp | <code>Number</code> | 
| [messages[].key] | <code>Buffer</code> | 
| messages[].value | <code>Buffer</code> | 

<a name="KafkaJsConsumeOption"></a>

## KafkaJsConsumeOption
**Kind**: global typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| groupId | <code>String</code> |  | Consumer's group id |
| [fromBeginning] | <code>Boolean</code> | <code>false</code> | When fromBeginning is `true`, the group will use the earliest offset. If set to `false`, it will use the latest offset. The default is `false` |
| [sessionTimeout] | <code>Number</code> | <code>30000</code> | Timeout in milliseconds used to detect failures. The consumer sends periodic heartbeats to indicate its liveness to the broker. If no heartbeats are received by the broker before the expiration of this session timeout, then the broker will remove this consumer from the group and initiate a rebalance |
| [rebalanceTimeout] | <code>Number</code> | <code>60000</code> | The maximum time that the coordinator will wait for each member to rejoin when rebalancing the group |
| [partitionAssigners] | <code>Array.&lt;String&gt;</code> | <code>[PartitionAssigners.roundRobin]</code> | An array of partition assignment protocols ordered by preference. |
| [heartbeatInterval] | <code>Number</code> | <code>3000</code> | The expected time in milliseconds between heartbeats to the consumer coordinator. Heartbeats are used to ensure that the consumer's session stays active. The value must be set lower than session timeout |
| [metadataMaxAge] | <code>Number</code> | <code>300000(5 minutes)</code> | The period of time in milliseconds after which we force a refresh of metadata even if we haven't seen any partition leadership changes to proactively discover any new brokers or partitions |
| [allowAutoTopicCreation] | <code>Boolean</code> | <code>true</code> | Allow topic creation when querying metadata for non-existent topics |
| [maxBytesPerPartition] | <code>Number</code> | <code>1048576(1MB)</code> | The maximum amount of data per-partition the server will return. This size must be at least as large as the maximum message size the server allows or else it is possible for the producer to send messages larger than the consumer can fetch. If that happens, the consumer can get stuck trying to fetch a large message on a certain partition |
| [minBytes] | <code>Number</code> | <code>1</code> | Minimum amount of data the server should return for a fetch request, otherwise wait up to `maxWaitTimeInMs` for more data to accumulate. |
| [maxBytes] | <code>Number</code> | <code>10485760(10MB)</code> | Maximum amount of bytes to accumulate in the response. Supported by Kafka >= 0.10.1.0 |
| [maxWaitTimeInMs] | <code>Number</code> | <code>5000</code> | The maximum amount of time in milliseconds the server will block before answering the fetch request if there isn’t sufficient data to immediately satisfy the requirement given by `minBytes` |
| [retry] | <code>Object</code> | <code>{ retries: 5 }</code> | See [retry](https://kafka.js.org/docs/configuration#retry) for more information |
| [readUncommitted] | <code>Boolean</code> | <code>false</code> | Configures the consumer isolation level. If `false` (default), the consumer will not return any transactional messages which were not committed. |
| [maxInFlightRequests] | <code>Number</code> | <code>null(no limit)</code> | Max number of requests that may be in progress at any time. If falsey then no limit. |
| [rackId] | <code>String</code> | <code>null (fetch from the leader always)</code> | Configure the "rack" in which the consumer resides to enable [follower fetching](https://kafka.js.org/docs/consuming#follower-fetching) |

<a name="KafkaJsConsumerOption"></a>

## KafkaJsConsumerOption
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| client | <code>Object</code> | The client instance of kafkajs. |
| topic | <code>String</code> | The topic that will be consumed. |
| consumerOption | [<code>KafkaJsConsumeOption</code>](#KafkaJsConsumeOption) | The option to create a new instance of `Kafka.ConsumerGroup`. |
| readCount | <code>Number</code> | After reading the count of `readCount`, the consumer will be paused. |
| pauseTime | <code>Number</code> | The duration of pause time, after that the consumer will be continued. |
| doTask | [<code>KafkaJsDoTask</code>](#KafkaJsDoTask) | The consume process function. |
| idleCheckInter | <code>Number</code> | The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. |

<a name="KafkaJsSendOption"></a>

## KafkaJsSendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |
| [partition] | <code>Number</code> | <code></code> | The partition number to produce to. |
| [key] | <code>Buffer</code> | <code></code> | The key associated with the message. |
| [timestamp] | <code>Number</code> | <code>0</code> | Timestamp to send with the message. |
| [headers] | <code>Object</code> | <code></code> | A list of custom key value pairs that provide message metadata. |

<a name="KafkaJsProducerOption"></a>

## KafkaJsProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name of current instance. |
| client | <code>client</code> |  | The client instance of kafkajs. |
| topic | <code>String</code> |  | The topic where you save data in it. |
| [delayInterval] | <code>Number</code> |  | When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |  |
| [acks] | <code>Number</code> | <code>-1</code> | Control the number of required acks. -1 = all insync replicas must acknowledge (default) 0 = no acknowledgments 1 = only waits for the leader to acknowledge |
| [timeout] | <code>Number</code> | <code>30000</code> | The time to await a response in ms |
| [compression] | <code>Number</code> | <code>CompressionTypes.None</code> | Compression codec, it use none compression as default. When pass `CompressionTypes.GZIP`, it will use gzip compression. |
| [encoder] | [<code>EncoderFunction</code>](#EncoderFunction) | <code>JSON.stringify</code> |  |
| [beforeEncodeType] | <code>String</code> | <code>&#x27;object&#x27;</code> | If the input data is not a instance of the type of `beforeEncodeType`, the `encoder` function will be not called. |

<a name="DoTask"></a>

## DoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 

<a name="ConsumerOption"></a>

## ConsumerOption
**Kind**: global typedef  
<a name="RdKafkaConsumerOption"></a>

## RdKafkaConsumerOption
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka. |
| topics | <code>Array.&lt;String&gt;</code> | The topics that will be consumed. |
| consumer | <code>rdkafka.KafkaConsumer</code> | The instance of `rdkafka.KafkaConsumer`. |
| readCount | <code>Number</code> | After reading the count of `readCount`, the consumer will be paused. |
| pauseTime | <code>Number</code> | The duration of pause time, after that the consumer will be continued. |
| doTask | [<code>DoTask</code>](#DoTask) | The consume process function. |
| idleCheckInter | <code>Number</code> | The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. |

<a name="RdKafkaSendOption"></a>

## RdKafkaSendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |
| [partition] | <code>Number</code> | <code></code> | The partition number to produce to. |
| [key] | <code>Buffer</code> | <code></code> | The key associated with the message. |
| [timestamp] | <code>Number</code> | <code>0</code> | Timestamp to send with the message. |
| [headers] | <code>Object</code> | <code></code> | A list of custom key value pairs that provide message metadata. |

<a name="RdKafkaProducerOption"></a>

## RdKafkaProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name of current instance. |
| producer | <code>rdkafka.HighLevelProducer</code> |  |  |
| [topic] | <code>String</code> |  | The topic where you save data in it. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |  |
| [encoder] | [<code>EncoderFunction</code>](#EncoderFunction) | <code>JSON.stringify</code> |  |
| [beforeEncodeType] | <code>String</code> | <code>&#x27;object&#x27;</code> | If the input data is not a instance of the type of `beforeEncodeType`, the `encoder` function will be not called. |

<a name="DoTask"></a>

## DoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 

<a name="SHKafkaConsumerOption"></a>

## SHKafkaConsumerOption
**Kind**: global typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [kafkaHost] | <code>String</code> |  | connect directly to kafka broker (instantiates a KafkaClient), when not passed, it will use KafkaConsumerOption.kafkaHost in default. |
| [ssl] | <code>Boolean</code> | <code>false</code> | optional (defaults to false) or tls options hash. |
| [encoding] | <code>String</code> | <code>&#x27;utf8&#x27;</code> | default is utf8, use 'buffer' for binary data. |
| [groupId] | <code>String</code> |  | it will use KafkaConsumerOption.groupId in default. |
| [fetchMaxBytes] | <code>Number</code> | <code>1024*1024</code> |  |
| [sessionTimeout] | <code>Number</code> | <code>15000</code> |  |
| [protocol] | <code>Array.&lt;String&gt;</code> | <code>[&#x27;roundrobin&#x27;]</code> | An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for built ins |
| [fromOffset] | <code>String</code> | <code>earliest</code> | Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved) quivalent to Java client's auto.offset.reset |
| [outOfRangeOffset] | <code>String</code> | <code>earliest</code> | how to recover from OutOfRangeOffset error (where save offset is past server retention) accepts same value as fromOffset |
| [migrateHLC] | <code>Boolean</code> | <code>false</code> |  |
| [migrateRolling] | <code>Boolean</code> | <code>true</code> |  |

<a name="SHKafkaConsumerOption"></a>

## SHKafkaConsumerOption
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka. |
| topics | <code>Array.&lt;String&gt;</code> | The topics that will be consumed. |
| [consumerOption] | [<code>SHKafkaConsumerOption</code>](#SHKafkaConsumerOption) | The option to create a new instance of `Kafka.ConsumerGroup`. |
| readCount | <code>Number</code> | After reading the count of `readCount`, the consumer will be paused. |
| pauseTime | <code>Number</code> | The duration of pause time, after that the consumer will be continued. |
| doTask | [<code>DoTask</code>](#DoTask) | The consume process function. |
| idleCheckInter | <code>Number</code> | The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. |

<a name="SHKafkaSendOption"></a>

## SHKafkaSendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |

<a name="SHKafkaProducerOption"></a>

## SHKafkaProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka, when both of `zookeeperHost` and `kafkaHost` passed, the `kafkaHost` has higher priority. |
| [topic] | <code>String</code> | The topic where you save data in it. |
| [delayInterval] | <code>Number</code> | When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |

