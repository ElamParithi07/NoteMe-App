const MyDataModel = require('../Models/MyDataModel')


async function updateData(req, res){
    try{
        const email = req.locals.email
        console.log(email)
        const updatedData = await MyDataModel.findOneAndUpdate({ email: email },req.body,{ new: true })
        return res.status(200).json({message:"Data updated successfully", data: updatedData})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:error})
    }
}

module.exports = { updateData }
