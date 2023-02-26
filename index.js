var Express = require("express")
var Bodyparser = require("body-parser")
var Mongoose = require("mongoose")
var Cors = require("cors")
const { EmployeeModel } = require("./Models/Employee")
const { ProjectModel } = require("./Models/Project")
const path = require('path')

var app = new Express()

app.use(Bodyparser.json())
app.use(Bodyparser.urlencoded({ extended: false }))
app.use(Cors())
app.use(Express.static(path.join(__dirname,'/build')))

Mongoose.set("strictQuery", true);
Mongoose.connect("mongodb+srv://varsha:varsha95@cluster0.etbicey.mongodb.net/TimeTrackerDB?retryWrites=true&w=majority",
{ useNewURlParser: true })

app.get("/",(req,res)=>{
    res.send("Welcome")
})


// Login Api
app.post("/api/login",async(req,res)=>{

    if(req.body.Email==="admin@gmail.com"&&req.body.Password==="admin@123"){
        res.send("admin")
    }
    else{
    await EmployeeModel.find(
    {
        $and:[{Username:req.body.Email},{Password: req.body.Password}]
    }
    ).then(
        (data)=>{
            res.json({"Status": "Success", "Data" : data})
        }
    ).catch(
        (err)=>{
            res.json({"Status": "Failed", "Data" : err})
        }
    ) 
} 
})




// Timetracker Api
app.post("/api/trackerip",async(req,res)=>{
    console.log(req.body)
    const newProject = new ProjectModel(req.body)
    await newProject.save(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data})
            }
        }
    )
})

// View All Project Api
app.post("/api/project", async (req, res) => {
    try {
        var result = await ProjectModel.find()
        res.send(result)
    } catch (err) {
        res.Status(500).send(err)
    }
})

// View My Project Api
app.post("/api/myproject",async(req,res)=>{
    try{
    var result = await ProjectModel.find({"Userid" : req.body.Userid})
    res.send(result)
    }catch(error){
        res.Status(500).send(error)
    }
})

// Delete My Project

app.delete("/api/project/:id", (req, res) => {
    var id = req.params.id;
    var data = req.body;
    ProjectModel.findByIdAndDelete(
        { "_id": id }, data, (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err })
            } else {
                res.json({ "Status": "Success", "Data": data })
            }
        }
    )
})


// Add Employee Api
app.post("/api/addemployee",async(req,res)=>{
    console.log(req.body)
    const newEmployee = new EmployeeModel(req.body)
    await newEmployee.save(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data})
            }
        }
    )
})

// View Employee Api

app.get("/api/viewemployees", async (req, res) => {
    try {
        var result = await EmployeeModel.find()
        res.send(result)
    } catch (err) {
        res.Status(500).send(err)
    }
})


// View Single Employee

app.get("/api/viewemployees/:id",(req,res)=>{
    var id = req.params.id;
    EmployeeModel.findById({_id: id},function(err,data){
        if(err) res.json(err);
        else{
            res.json(data);
        }
    })
});


// Delete Employee

app.delete("/api/viewemployees/:id", (req, res) => {
    var id = req.params.id;
    var data = req.body;
    EmployeeModel.findByIdAndDelete(
        { "_id": id }, data, (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err })
            } else {
                res.json({ "Status": "Success", "Data": data })
            }
        }
    )
})

// Update Employee

app.post("/api/update/:id",(req,res)=>{
    var id = req.params.id;    
    var data = req.body;
    EmployeeModel.findByIdAndUpdate(
        {_id: id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data});
            }
        }
    )
});


app.get("/*",function(req,res){
    res.sendFile(path.join(__dirname,'build/index.html'))
})

app.listen(3001,()=>{
    console.log("Server Started");
})