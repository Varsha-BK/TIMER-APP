const Mongoose = require("mongoose")

const EmployeeSchema = Mongoose.Schema(
    {
        Name : String,
        Email : String,
        Designation : String,
        Phonenumber : Number,
        Password : String
    }
)

const EmployeeModel = Mongoose.model("Employees",EmployeeSchema)
module.exports = {EmployeeModel}
