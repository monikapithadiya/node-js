const mongoose = require("mongoose")


async function connectToDB()
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('>>>>>>>>>>Database Connected Successfully......<<<<<<<<<<')
    }
    catch(err)
    {
        console.log("Somethine Went Wrong in DB",err)
    }
}
module.exports = connectToDB