const mongoose = require("mongoose")

const connectDB = async (DATABASE_URL) => {
    try{
        const dbName = {
            DbName: "aggregation"
        }
    await mongoose.connect(DATABASE_URL, dbName)
    console.log('connected with database')
    }
    catch (err){
        console.error(err)
    }
} 

module.exports = connectDB