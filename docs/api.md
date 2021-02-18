## Classes

<dl>
<dt><a href="#SHKafkaProducer">SHKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#KafkaJsProducer">KafkaJsProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#RdKafkaConsumer">RdKafkaConsumer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#RdKafkaProducer">RdKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#SHKafkaProducer">SHKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#SHKafkaProducer">SHKafkaProducer</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#PrepareMiddleware">PrepareMiddleware(data)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DoTask">DoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ConsumerOption">ConsumerOption</a></dt>
<dd></dd>
<dt><a href="#KafkaConsumerOption">KafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#SendOption">SendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ProducerOption">ProducerOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DoTask">DoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ConsumerOption">ConsumerOption</a></dt>
<dd></dd>
<dt><a href="#KafkaConsumerOption">KafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#SendOption">SendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ProducerOption">ProducerOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DoTask">DoTask</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ConsumerOption">ConsumerOption</a></dt>
<dd></dd>
<dt><a href="#KafkaConsumerOption">KafkaConsumerOption</a></dt>
<dd></dd>
<dt><a href="#SendOption">SendOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ProducerOption">ProducerOption</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="SHKafkaProducer"></a>

## SHKafkaProducer ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [SHKafkaProducer](#SHKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#SHKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaProducer](#SHKafkaProducer.SHKafkaProducer)
            * [new SHKafkaProducer(option)](#new_SHKafkaProducer.SHKafkaProducer_new)
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_SEND_ERROR](#SHKafkaProducer.EVENT_SEND_ERROR)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of the producer of Kafka

<a name="SHKafkaProducer+addData"></a>

### shKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SendOption</code>](#SendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaProducer"></a>

### SHKafkaProducer.SHKafkaProducer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="new_SHKafkaProducer.SHKafkaProducer_new"></a>

#### new SHKafkaProducer(option)
Creates an instance of SHKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>ProducerOption</code>](#ProducerOption) | 

<a name="SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### SHKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.EVENT_SEND_ERROR"></a>

### SHKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="KafkaJsProducer"></a>

## KafkaJsProducer ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [KafkaJsProducer](#KafkaJsProducer) ⇐ <code>EventEmitter</code>
    * [new KafkaJsProducer()](#new_KafkaJsProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#KafkaJsProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.KafkaJsProducer](#KafkaJsProducer.KafkaJsProducer)
            * [new KafkaJsProducer(option)](#new_KafkaJsProducer.KafkaJsProducer_new)
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_SEND_ERROR](#KafkaJsProducer.EVENT_SEND_ERROR)

<a name="new_KafkaJsProducer_new"></a>

### new KafkaJsProducer()
The class of the producer of Kafka

<a name="KafkaJsProducer+addData"></a>

### kafkaJsProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData need to send.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SendOption</code>](#SendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="KafkaJsProducer.KafkaJsProducer"></a>

### KafkaJsProducer.KafkaJsProducer
**Kind**: static class of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="new_KafkaJsProducer.KafkaJsProducer_new"></a>

#### new KafkaJsProducer(option)
Creates an instance of KafkaJsProducer.


| Param | Type |
| --- | --- |
| option | [<code>ProducerOption</code>](#ProducerOption) | 

<a name="KafkaJsProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### KafkaJsProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="KafkaJsProducer.EVENT_SEND_ERROR"></a>

### KafkaJsProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>KafkaJsProducer</code>](#KafkaJsProducer)  
<a name="RdKafkaConsumer"></a>

## RdKafkaConsumer ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [RdKafkaConsumer](#RdKafkaConsumer) ⇐ <code>EventEmitter</code>
    * [new RdKafkaConsumer()](#new_RdKafkaConsumer_new)
    * _instance_
        * [._consume(doTask)](#RdKafkaConsumer+_consume)
    * _static_
        * [.RdKafkaConsumer](#RdKafkaConsumer.RdKafkaConsumer)
            * [new RdKafkaConsumer(option)](#new_RdKafkaConsumer.RdKafkaConsumer_new)
        * [.EVENT_CLIENT_READY](#RdKafkaConsumer.EVENT_CLIENT_READY)
        * [.EVENT_CLIENT_ERROR](#RdKafkaConsumer.EVENT_CLIENT_ERROR)
        * [.EVENT_CONSUMER_ERROR](#RdKafkaConsumer.EVENT_CONSUMER_ERROR)
        * [.EVENT_LOG](#RdKafkaConsumer.EVENT_LOG)

<a name="new_RdKafkaConsumer_new"></a>

### new RdKafkaConsumer()
The class of RdKafkaConsumer

<a name="RdKafkaConsumer+_consume"></a>

### rdKafkaConsumer.\_consume(doTask)
The consume function.Do not call this function manual!

**Kind**: instance method of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="RdKafkaConsumer.RdKafkaConsumer"></a>

### RdKafkaConsumer.RdKafkaConsumer
**Kind**: static class of [<code>RdKafkaConsumer</code>](#RdKafkaConsumer)  
<a name="new_RdKafkaConsumer.RdKafkaConsumer_new"></a>

#### new RdKafkaConsumer(option)
Creates an instance of RdKafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

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
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [RdKafkaProducer](#RdKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new RdKafkaProducer()](#new_RdKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#RdKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.RdKafkaProducer](#RdKafkaProducer.RdKafkaProducer)
            * [new RdKafkaProducer(option)](#new_RdKafkaProducer.RdKafkaProducer_new)
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#RdKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_PRODUCER_ERROR](#RdKafkaProducer.EVENT_PRODUCER_ERROR)
        * [.EVENT_SEND_ERROR](#RdKafkaProducer.EVENT_SEND_ERROR)

<a name="new_RdKafkaProducer_new"></a>

### new RdKafkaProducer()
The class of the producer of Kafka

<a name="RdKafkaProducer+addData"></a>

### rdKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka.

**Kind**: instance method of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SendOption</code>](#SendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="RdKafkaProducer.RdKafkaProducer"></a>

### RdKafkaProducer.RdKafkaProducer
**Kind**: static class of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="new_RdKafkaProducer.RdKafkaProducer_new"></a>

#### new RdKafkaProducer(option)
Creates an instance of RdKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>ProducerOption</code>](#ProducerOption) | 

<a name="RdKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### RdKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="RdKafkaProducer.EVENT_PRODUCER_ERROR"></a>

### RdKafkaProducer.EVENT\_PRODUCER\_ERROR
The event to notify the producer is error.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="RdKafkaProducer.EVENT_SEND_ERROR"></a>

### RdKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>RdKafkaProducer</code>](#RdKafkaProducer)  
<a name="SHKafkaProducer"></a>

## SHKafkaProducer ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [SHKafkaProducer](#SHKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#SHKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaProducer](#SHKafkaProducer.SHKafkaProducer)
            * [new SHKafkaProducer(option)](#new_SHKafkaProducer.SHKafkaProducer_new)
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_SEND_ERROR](#SHKafkaProducer.EVENT_SEND_ERROR)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of the producer of Kafka

<a name="SHKafkaProducer+addData"></a>

### shKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SendOption</code>](#SendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaProducer"></a>

### SHKafkaProducer.SHKafkaProducer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="new_SHKafkaProducer.SHKafkaProducer_new"></a>

#### new SHKafkaProducer(option)
Creates an instance of SHKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>ProducerOption</code>](#ProducerOption) | 

<a name="SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### SHKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.EVENT_SEND_ERROR"></a>

### SHKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="SHKafkaProducer"></a>

## SHKafkaProducer ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [SHKafkaProducer](#SHKafkaProducer) ⇐ <code>EventEmitter</code>
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * [new SHKafkaProducer()](#new_SHKafkaProducer_new)
    * _instance_
        * [.addData(taskData, options, [callback])](#SHKafkaProducer+addData) ⇒ <code>Boolean</code>
    * _static_
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
            * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
        * [.SHKafkaProducer](#SHKafkaProducer.SHKafkaProducer)
            * [new SHKafkaProducer(option)](#new_SHKafkaProducer.SHKafkaProducer_new)
        * [.EVENT_DELAY_MESSAGE_SEND_FINISHED](#SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED)
        * [.EVENT_SEND_ERROR](#SHKafkaProducer.EVENT_SEND_ERROR)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)
        * [.SHKafkaConsumer#consume(doTask)](#SHKafkaProducer.SHKafkaConsumer+consume)

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of KafkaConsumer

<a name="new_SHKafkaProducer_new"></a>

### new SHKafkaProducer()
The class of the producer of Kafka

<a name="SHKafkaProducer+addData"></a>

### shKafkaProducer.addData(taskData, options, [callback]) ⇒ <code>Boolean</code>
Send data to kafka, it will send the data to kafka every `delayInterval` ms when `delayInterval` is set. It will wait the client i

**Kind**: instance method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
**Returns**: <code>Boolean</code> - Whether the taskData is valid.  

| Param | Type | Default |
| --- | --- | --- |
| taskData | <code>Object</code> |  | 
| options | [<code>SendOption</code>](#SendOption) |  | 
| [callback] | <code>function</code> | <code>function(err) {}</code> | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaConsumer"></a>

### SHKafkaProducer.SHKafkaConsumer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

* [.SHKafkaConsumer](#SHKafkaProducer.SHKafkaConsumer)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)
    * [new SHKafkaConsumer(option)](#new_SHKafkaProducer.SHKafkaConsumer_new)

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="new_SHKafkaProducer.SHKafkaConsumer_new"></a>

#### new SHKafkaConsumer(option)
Creates an instance of KafkaConsumer. It will call the function of #consumer inner.


| Param | Type |
| --- | --- |
| option | [<code>KafkaConsumerOption</code>](#KafkaConsumerOption) | 

<a name="SHKafkaProducer.SHKafkaProducer"></a>

### SHKafkaProducer.SHKafkaProducer
**Kind**: static class of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="new_SHKafkaProducer.SHKafkaProducer_new"></a>

#### new SHKafkaProducer(option)
Creates an instance of SHKafkaProducer.


| Param | Type |
| --- | --- |
| option | [<code>ProducerOption</code>](#ProducerOption) | 

<a name="SHKafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED"></a>

### SHKafkaProducer.EVENT\_DELAY\_MESSAGE\_SEND\_FINISHED
The event to notify that a batch of messages have been sent finished.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.EVENT_SEND_ERROR"></a>

### SHKafkaProducer.EVENT\_SEND\_ERROR
The event emitted when an error occurs after sending data to kafka.

**Kind**: static property of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  
<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

<a name="SHKafkaProducer.SHKafkaConsumer+consume"></a>

### SHKafkaProducer.SHKafkaConsumer#consume(doTask)
The consume function.Do not call this function manual!

**Kind**: static method of [<code>SHKafkaProducer</code>](#SHKafkaProducer)  

| Param | Type |
| --- | --- |
| doTask | [<code>DoTask</code>](#DoTask) | 

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

<a name="PrepareMiddleware"></a>

## PrepareMiddleware(data) ⇒ <code>Boolean</code>
**Kind**: global function  
**Returns**: <code>Boolean</code> - whether send to kafka server  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data want to send |

<a name="DoTask"></a>

## DoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 

<a name="ConsumerOption"></a>

## ConsumerOption
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

<a name="KafkaConsumerOption"></a>

## KafkaConsumerOption
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka. |
| topics | <code>Array.&lt;String&gt;</code> | The topics that will be consumed. |
| [consumerOption] | [<code>ConsumerOption</code>](#ConsumerOption) | The option to create a new instance of `Kafka.ConsumerGroup`. |
| readCount | <code>Number</code> | After reading the count of `readCount`, the consumer will be paused. |
| pauseTime | <code>Number</code> | The duration of pause time, after that the consumer will be continued. |
| doTask | [<code>DoTask</code>](#DoTask) | The consume process function. |
| idleCheckInter | <code>Number</code> | The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. |

<a name="SendOption"></a>

## SendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |
| [partition] | <code>Number</code> | <code></code> | The partition number to produce to. |
| [key] | <code>Buffer</code> | <code></code> | The key associated with the message. |
| [timestamp] | <code>Number</code> | <code>0</code> | Timestamp to send with the message. |
| [headers] | <code>Object</code> | <code></code> | A list of custom key value pairs that provide message metadata. |

<a name="ProducerOption"></a>

## ProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka, when both of `zookeeperHost` and `kafkaHost` passed, the `kafkaHost` has higher priority. |
| [topic] | <code>String</code> | The topic where you save data in it. |
| [delayInterval] | <code>Number</code> | When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |

<a name="DoTask"></a>

## DoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 

<a name="ConsumerOption"></a>

## ConsumerOption
**Kind**: global typedef  
<a name="KafkaConsumerOption"></a>

## KafkaConsumerOption
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

<a name="SendOption"></a>

## SendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |
| [partition] | <code>Number</code> | <code></code> | The partition number to produce to. |
| [key] | <code>Buffer</code> | <code></code> | The key associated with the message. |
| [timestamp] | <code>Number</code> | <code>0</code> | Timestamp to send with the message. |
| [headers] | <code>Object</code> | <code></code> | A list of custom key value pairs that provide message metadata. |

<a name="ProducerOption"></a>

## ProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| producer | <code>rdkafka.HighLevelProducer</code> |  |
| [topic] | <code>String</code> | The topic where you save data in it. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |

<a name="DoTask"></a>

## DoTask : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;Object&gt;</code> | 

<a name="ConsumerOption"></a>

## ConsumerOption
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

<a name="KafkaConsumerOption"></a>

## KafkaConsumerOption
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka. |
| topics | <code>Array.&lt;String&gt;</code> | The topics that will be consumed. |
| [consumerOption] | [<code>ConsumerOption</code>](#ConsumerOption) | The option to create a new instance of `Kafka.ConsumerGroup`. |
| readCount | <code>Number</code> | After reading the count of `readCount`, the consumer will be paused. |
| pauseTime | <code>Number</code> | The duration of pause time, after that the consumer will be continued. |
| doTask | [<code>DoTask</code>](#DoTask) | The consume process function. |
| idleCheckInter | <code>Number</code> | The instance of KafkaConsumer has a timer inner, to check whether the process of `doTask` is idle. The timer will trigger every `idleCheckInter` ms. |

<a name="SendOption"></a>

## SendOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [topicSuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | The suffix of the topic name. |

<a name="ProducerOption"></a>

## ProducerOption : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of current instance. |
| [kafkaHost] | <code>String</code> | The host of the broker of kafka, when both of `zookeeperHost` and `kafkaHost` passed, the `kafkaHost` has higher priority. |
| [topic] | <code>String</code> | The topic where you save data in it. |
| [delayInterval] | <code>Number</code> | When pass this parameter, messages will publish to kafka every `option.delayInterval` ms, otherwise messages will publish to kafka at once. |
| [prepareMiddleware] | [<code>PrepareMiddleware</code>](#PrepareMiddleware) |  |

