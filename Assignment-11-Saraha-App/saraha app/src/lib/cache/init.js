
import { env } from '../config/env.js';
import { RedisCasheProvider } from '../../pkg/cache/redis.js';

export const cacheprovider = new RedisCasheProvider({
host : env.redis.host,
port : env.redis.port,
password : env.redis.password || '',
});