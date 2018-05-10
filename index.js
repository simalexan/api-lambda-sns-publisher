const AWS = require('aws-sdk');
const sns = new AWS.SNS()
const TOPIC_ARN = process.env.TOPIC_ARN;

exports.handler = (event) => {
    if (!event.body) {
        return Promise.resolve({statusCode: 400, body: 'invalid'});
    }
    return sns.publish({
        Message: event.body,
        TopicArn: TOPIC_ARN
    })
    .promise()
    .then(() => ({statusCode: 204, body: ''}))
    .catch(err => {
        console.log(err);
        return {statusCode: 500, body: 'sns-error'};
    });
};