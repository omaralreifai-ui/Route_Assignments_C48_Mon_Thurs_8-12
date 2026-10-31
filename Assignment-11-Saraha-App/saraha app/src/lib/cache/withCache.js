import {cacheprovider} from "./init.js";

export function withaCache(ttl =3600) {
    return async  (req ,res ,next) => {
        let key =`${req.method}:${req.originalUrl}` ;
        const cache  =await cacheprovider.get(key)
        if(cache) {
            res.setHeader('X-Cache' , "HLT")
            return res.json(JSON.parse(cache));

        }
        const originaljson = res.json.bind(res);
        
        res.json =((body) => {
            cacheprovider.set(key,JSON.stringify(body) ,ttl);
            res.setHeader('X-Cache' , "MISS");
            return originaljson(body)
        }) ;
        next()
    }

}