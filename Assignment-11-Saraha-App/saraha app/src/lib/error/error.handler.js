import {logger} from "../logger.js/logger.js";

export function globalerror (err , req , res , next)  {
    logger.error(err.message, {
        stack: err.stack,
        correlationId: req.correlationId,
    })
    if(err.inoperational === true)
    {
        return res.status(err.statusCode).json({
            message : err.message ,
            success: false
        })
    }
    return res.status(500).json({
        error :'something went wrong' , succes : false
    })
}