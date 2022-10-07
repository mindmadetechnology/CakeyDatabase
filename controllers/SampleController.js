const sample=require('../models/sample');
const uploadImage=(req,res)=>{
    try{
        const newImage=new sample({
            Image:req.file
        })
        newImage.save(function(err){
            if(err){
                res.send({statusCode:400,message:"Failed"})
            }else{
                res.send({statusCode:200,message:"Uploaded Successfully"})

            }
        
        })

    }catch(err){
        res.send({statusCode:400,message:"Catch Err"})
    }

}
module.exports={
    uploadImage
}