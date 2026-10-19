import Redis from "ioredis";

export class RedisCasheProvider {
    client ;

    constructor(config) { 
        this.client =new Redis({
          host :config.host,
          port: config.port,
          password: config.password,
          lazyConnect: true,
          maxloadingRetryTime: 3,
        });
        this.client.on('error', (err) => {
          console.log('Redis error:', err.message);
        }); 
        this.client.connect().catch(err => console.log('failed to connect to redis',err.message));

    }
    async set(key ,value , ttl) {
        return this.client.set(key, value, 'EX', ttl);
    }
   async get(key){
        return this.client.get(key);
    }
     async del(key){
        return this.client.del(key);
    }
} 