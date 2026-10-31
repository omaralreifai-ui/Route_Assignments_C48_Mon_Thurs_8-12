  class Logger  {
 constructor() {
    if(!Logger.instance) {
        Logger.instance = this;
    }
    return Logger.instance;
     
 }
 log(level , message , metaData = {}) {
    let messageObject = {
        level : level ,
        message : message ,
       ...metaData ,
        timestamp : Date.now()
    } 
    console.log(JSON.stringify(messageObject));
 }
 error(message , metaData ={}) {
this.log('error', message, metaData);
 }
 debug(message , metaData ={}) {
this.log('debug', message, metaData);
 }
 info(message , metaData ={}) {
this.log('info', message, metaData);
 }
}
export const logger =new Logger();
