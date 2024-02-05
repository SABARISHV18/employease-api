const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    name:String,
})

const Categorymodel=mongoose.model("category", categorySchema)
module.exports=Categorymodel