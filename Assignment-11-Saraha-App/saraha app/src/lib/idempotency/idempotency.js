import {cacheprovider} from "../cache/init.js";

export function idempotency(ttl =3600) {
   return async function (req,res,next) {
        const idempotency = req.headers['idempotency'];
        let key = `${req.method} :${req.originalUrl} : ${idempotency}`;
        const cache = await cacheprovider.get(key);
        if(cache) {
            res.setHeader('X-CACHE', 'HIT');
            return res.json(JSON.parse(cache));
        }
        const original = res.json.bind(res);
        res.json = ((body) => {
            if(res.statusCode >= 200 && res.statusCode < 300) {
                cacheprovider.set(key, JSON.stringify(body), ttl);
                res.setHeader('X-CACHE', 'MISS');
            }
            original(body);
        });
        next();
    }
}
