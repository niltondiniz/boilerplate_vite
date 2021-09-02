export const KafkaConfig = {
    name: "KAFKA_SERVICE",
    //broker: 'host.docker.internal:29092',
    broker: "broker:29092",
    consumer: { groupId: "payment-consumer-"},
};