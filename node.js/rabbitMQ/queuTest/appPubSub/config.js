config = {};
config.CHANNEL = "test";
config.ROUTE_KEY = "test";
config.ENTITY_ID = "entity-HFJSKXJDSFKJSS";
config.ENTYTY_CHANNEL_TOPIC = config.ENTITY_ID + "-direct";
config.TOPIC_TYPE = "GPS";
config.PUB_KEY = config.ENTITY_ID + "-8976543-exch";
config.SUB_KEY = config.ENTITY_ID + "-1133423-queu";

config.EXCHANGE_OPTIONS = { type : "direct"};

config.QUEU_OPTIONS =  { durable: false, autoDelete : false ,exclusive : false};