const Mongoose = require("mongoose")

const TimeSchema = Mongoose.Schema(
    {
        Userid : String,
        Name : String,
        Totaltime : Number
    }
)

const TimeModel = Mongoose.model("Totaltimes",TimeSchema)

module.exports = {TimeModel}