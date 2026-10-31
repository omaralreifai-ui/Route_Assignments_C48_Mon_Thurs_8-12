import multer, {diskStorage} from "multer";
function fileupload(){
     return  multer({
        storage : diskStorage({
            destination : 'uploads'
            ,
            filename : function (req , file , cb) {
                cb(null , file.originalname);
            }
        })
    })
}
export function uploadSingleFile(fileName) {
    return  fileupload().single(fileName);
}
export function uploadArrayFile(fileName){
    return fileupload().array(fileName);

}
export function uploadFields(fields){
    return fileupload().fields(fields);
}