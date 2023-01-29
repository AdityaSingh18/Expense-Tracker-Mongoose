const AWS = require('aws-sdk');

exports.uploadToS3 = ( data , filename) => {
    const  BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_ACCESS_KEY 
    const IAM_SECRET_KEY  = process.env.IAM_SECRET


    // make new instance with keys to access
    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_SECRET_KEY
    })

    //create bucket with parameter to upload
    //our bucket is already created in S3, so no need to create again

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read' // to give public access to file
    }

    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err ,s3response)=>{
            if(err){
                console.log('something went wrong'+err)
            }else{
                console.log(s3response)
                resolve(s3response.Location)  
            }
        })
    })

}