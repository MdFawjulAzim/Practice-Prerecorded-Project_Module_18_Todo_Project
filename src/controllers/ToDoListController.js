const ToDoListModel = require('../models/ToDoListModel.js'); 


//Create Token

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