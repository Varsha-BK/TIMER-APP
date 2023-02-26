const Mongoose = require("mongoose")

const ProjectSchema = Mongoose.Schema(
    {
        Userid : String,
        Name : String,
        Projectname : String,
        Task : String,
        JobDescription : String,
        Modeofwork : String,
        AddedDate : {
            type : Date,
            default : Date.now
        },
        Duration : String,
        Totaltime : String
    }
)

const ProjectModel = Mongoose.model("Projects",ProjectSchema) 
module.exports = {ProjectModel}