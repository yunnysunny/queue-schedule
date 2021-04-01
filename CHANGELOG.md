# v2.5.0

## Add

1. Add the feature of encoding data manual, see `RdKafkaProducer` and `KafkaJsProducer`.

# v2.4.0
## Add
1. Add the support of kafkajs, see `KafkaJsProducer` and `KafkaJsConsumer`.

# v2.3.5
## Fix
1. Fix the memory leak when the connection of broker is failed in `RdKafkaProducer`.
2. Fix the the broken when sending message while the connection is not ready in `SHKafkaProducer`.

# v2.3.4
## Fix
1. Remove the cache data in memory when use rdkafka.

# v2.3.3
## Fix
1. Just fix the building error of travis-ci.

# v2.3.2
## Fix
1. Fix the problem of not sending data in given delay time.

# v2.3.1
## Improvement
1. Remove the flush operation in `RdKafkaProducer`.

# v2.3.0
## Improvement
1. Set the timestamp to `0` when call rdkafka's produce function.

# v2.2.1
## Fix
1. It may case to memory leak when using `RdKafkaConsumer`, but I can't reproduce it, just add some code to defend it.

# v2.2.0
## Breaking Changes
1. Rename the `KafkaProducer` to `SHKafkaProducer`, rename the `KafkaConsumer` to `SHKafkaConsumer`, drop the object of `globalEvent`.  
2. If you still use the libary of `kafka-node`, you have to wrap an object of `Promise` and give the value of an instance of `HighLevelProducer` when the instance is ready. For example:

```javascript
const client = new kafka.KafkaClient({kafkaHost: 'the peers of you kafka cluster'});
const producerCreater = new kafka.HighLevelProducer(client);
const producerPromise = new Promise(function(resolve,reject) {
    producerCreater.on('ready',function() {
        resolve(producerCreater);
    });

    producerCreater.on('error',function(err) {
        reject(err);
    });
});
const producerSH = new SHKafkaProducer({
    name : 'myname',
    topic: 'mytopic',
    producerPromise
});
```

# v2.1.0
## Add
1. Add the choice of the driver of `node-librakafka` to produce and consume message, see `RdKafkaProducer` and `RdKafkaConsumer`.

# v2.0.0
## Improvement
1. Bump `kafka-node` to 5.0.0.

# v1.1.1
## Improvement
1. Bump `kafka-node` to 4.1.3.

# v1.1.0
## Add
1. Add the object of `globalEvent` to emit the events of client's and producer's status.
2. Use a producer pool to cache the producer with same kafka host, in other words, you will only create a single producer instance, when you instantiate diffrent `KafkaProducer` with the same kafka host.

## Remove
1. Remove the event of `EVENT_CLIENT_READY` `EVENT_CLIENT_ERROR` `EVENT_CLIENT_CLOSE` `EVENT_PRODUCER_READY` `EVENT_PRODUCER_ERROR` from `KafkaProducer`, these events mentioned above, are move to the object `globalEvent`.

# v1.0.0
## Add
1. Emit event when kafkaClient closed.
2. Add the parameter of `prepareMiddleware` to `KafkaProducer`.

## Breaking Changes
1. Remove the option of `zookeeperHost` form `KafkaProducer` and `KafkaConsumer`.
2. Remove the `manager` object.
3. Remove the function of `addDataDelay` form `KafkaProducer`.
4. Remove the parameter of `topicList` from `KafkaProducer`.
5. The function `addData` of `KafkaProducer` returns a boolean value, which indicate whether the data to send is vaild.

# v0.6.0
## Add
1. Bump the package `kafka-node` to 3.0.1.

# v0.5.3
## Fix
1. Resovle the issue of double stringify.

# v0.5.2
## Add
1. Add parameter of `fromOffset` to KafkaConsumer.

# v0.5.1
## Add
1. Add feature of emitting event of `KafkaProducer.EVENT_SEND_ERROR`.

# v0.5.0
## Add
1. Use consumerGroup instead of consumer.
2. Add the feature of using broker url to connect to the kafka client.

# v0.3.1
## Add
1. Use HighLevelProducer instead of Producer.
2. Add the feature of setting the groupId of consumer.
3. Add the parameter of the count of messages published to the event of `EVENT_DELAY_MESSAGE_SEND_FINISHED`

# v0.2.1
## Add
1. Do code refactoring, create kafka client in the KafkaProducer and KafkaConsumer.
2. Add feature of emitting event of `KafkaProducer.EVENT_CLIENT_READY` `KafkaProducer.EVENT_CLIENT_ERROR` `KafkaProducer.EVENT_PRODUCER_READY` `KafkaProducer.EVENT_PRODUCER_ERROR` `KafkaConsumer.EVENT_CLIENT_READY` `KafkaConsumer.EVENT_CLIENT_ERROR` `KafkaConsumer.EVENT_CONSUMER_ERROR`.
## Fix
1. Fxed the error of breaking down when call addKafkaSchedule twice with the same name.

# v0.2.0
## Add
1. Add some testcases.
2. Add the feature of emitting event of  `KafkaProducer.EVENT_DELAY_MESSAGE_SEND_FINISHED` when delay message publish finished.

# v0.1.0
## Add
1. Add feature f sending message delay.
2. Add travis-ci.yml.

