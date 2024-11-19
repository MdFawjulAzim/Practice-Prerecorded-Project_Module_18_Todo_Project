const ToDoListModel = require('../models/ToDoListModel.js'); 


//Create ToDoList

exports.CreateToDo = async (req, res) => {
    try {
        let reqBody = req.body;
        let TodoSubject = reqBody.TodoSubject;
        let TodoDescription = reqBody.TodoDescription;

        let UserName = req.headers.UserName;
        let TodoStatus = "New";
        let TodoCreateDate = Date.now();
        let TodoUpdateDate = Date.now();

        let PostBody ={
            UserName: UserName,
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: TodoStatus,    
            TodoCreateDate: TodoCreateDate,
            TodoUpdateDate: TodoUpdateDate
        }
        const data = await ToDoListModel.create(PostBody);
        if(!data){
        return res.status(401).json({ status: "No Found Data", data:"No ToDo item created." });
        }
        return res.status(200).json({ status: "success", data: data });
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
};

//Read TodoList

exports.SelectToDo = async(req,res) => {
    try {
        let UserName = req.headers.UserName; 
        const data = await ToDoListModel.find({ UserName: UserName});
        if(!data || data.length === 0) {
            return res.status(404).json({ status: "Not Found"});
        }else{
            return res.status(200).json({ status: "success", data: data });
        }
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
}

//Update TodoList

exports.UpdateToDo = async(req,res) => {
    try {
        let reqBody = req.body;
        let TodoSubject = reqBody.TodoSubject;
        let TodoDescription = reqBody.TodoDescription;
        let _id = reqBody['_id'];
        let TodoUpdateDate = Date.now();

        let PostBody ={
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,  
            TodoUpdateDate: TodoUpdateDate
        }

        const Data = await ToDoListModel.findOneAndUpdate(
             { _id: _id },{$set:PostBody},{new: true }
         );
         if (!Data) {
            return res.status(404).json({ status: "fail", message: "ToDo item not found." });
        }

        return res.status(200).json({ status: 'success', data: Data });
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
} 

//Status update

exports.UpdateStatusToDo = async(req,res) => {
    try {
        let reqBody = req.body;
        let TodoStatus = reqBody.TodoStatus;
        let _id = reqBody['_id'];
        let TodoUpdateDate = Date.now();

        let PostBody ={
            TodoStatus: TodoStatus,
            TodoUpdateDate: TodoUpdateDate
        }

        const Data = await ToDoListModel.findOneAndUpdate(
             { _id: _id },{$set:PostBody},{new: true }
         );
         if (!Data) {
            return res.status(404).json({ status: "fail", message: "ToDo Status item not found." });
        }

        return res.status(200).json({ status: 'success', data: Data });
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
} 


//  Remove todo status

exports.RemoveToDo = async(req,res) => {
    try {
        let _id = req.body._id;


        const Data = await ToDoListModel.deleteOne({_id: _id});
        return res.status(200).json({ status: 'success', data: Data });
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
} 

//Filter to do list

exports.SelectToDoByStatus = async(req,res) => {
    try {
        let UserName = req.headers.UserName;
        let TodoStatus = req.body.TodoStatus;
        const data = await ToDoListModel.find({ UserName: UserName,TodoStatus:TodoStatus});
        if(!data || data.length === 0) {
            return res.status(404).json({ status: "Not Found"});
        }else{
            return res.status(200).json({ status: "success", data: data });
        }
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
}

// Filter by date to do list

exports.SelectToDoByDate = async(req,res) => {
    try {
        let UserName = req.headers.UserName;
        let FormDate = req.body.FormDate;
        let ToDate = req.body.ToDate;

        const data = await ToDoListModel.find({ UserName: UserName,TodoCreateDate:{
                                                                                    $gte: new Date(FormDate),
                                                                                    $lte: new Date(ToDate)
                                                                                }});
        if(!data || data.length === 0) {
            return res.status(404).json({ status: "Not Found"});
        }else{
            return res.status(200).json({ status: "success", data: data });
        }
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.toString() });
    }
}