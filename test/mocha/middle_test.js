const {expect} = require('chai');
const {SHKafkaProducer} = require('../../index');
const {producerPromise,producer} = require('./config');
const SCHEDULE_NAME1 = 'schedule1';
const TOPIC_NAME1 = 'topic.error';
const contentLenCheckFun = function(data) {
    if (data.content.length > 30) {
        return false;
    }
    return true;
};

describe('middleware test#',function() {
    // it('wait for client ready',function(done) {
    //     producerPromise.then(function() {
    //         done();
    //     });
    // });
    it('should not send to kafka', function(done) {
        const data = {'content':'对于经常出差的人们来说，提着个笨重的行李箱、还要拿出笔记本找个舒适的姿势工作，绝不是一件轻松的事情。不过一款名为 Smartoo 的小玩意，或许能够给你带来意外的惊喜。1507884372122','avatar_url':'http://ss.bdimg.com/static/superman/img/logo/logo_white_fe6da1ec.png','created_at':1507884371865};

        const kafkaProducer = new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            delayInterval:1000,
            producerPromise,
            prepareMiddleware: contentLenCheckFun
        });
        const result =    kafkaProducer.addData(data);
        expect(result).to.be.false;
        done();
    });

    it('should  send to kafka', function(done) {
        const data = {'content':'12345','avatar_url':'http://ss.bdimg.com/static/superman/img/logo/logo_white_fe6da1ec.png','created_at':1507884371865};

        const kafkaProducer = new SHKafkaProducer({
            name : SCHEDULE_NAME1,
            topic: TOPIC_NAME1,
            delayInterval:1000,
            producerPromise,
            prepareMiddleware: contentLenCheckFun
        });
        const result = kafkaProducer.addData(data);
        expect(result).to.be.true;
        done();
    });
});