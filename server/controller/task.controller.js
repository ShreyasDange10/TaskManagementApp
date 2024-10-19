import taskModel from "../model/task.model";

export const addTask = async (req, res) =>{
    try {

        const { name, description, status, userID, categoryID } = req.body
        const addTask = new taskModel({
            name,
            description,
            status,
            userID,
            categoryID
        });
        const addTaskData = await addTask.save();
        
        if(addTaskData){
            return res.status(200).json({
                data:addTaskData,
                message:"Task added Successfully"
            })
        }else{
            return res.status(400).json({
                message:"Cannot add task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const getTask = async (req, res) =>{
    try {
        const getTaskData = await taskModel.find();
        if(getTaskData){
            res.status(200).json({
                data:getTaskData,
                message:"Data fetched Successfully"
            })
        }else{
            res.status(400).json({
                message:"Cannot fetch data"
            })
        }
    } catch (error) {
        res.status(500).json({
            data:`Server Error: ${error.message}`
        })
    }
}

export const getSingleTask = async (req, res) =>{
    try {
        const taskID = req.params.taskID
        const getTaskData = await taskModel.findOne({_id:taskID});
        if(getTaskData){
            res.status(200).json({
                data:getTaskData,
                message:"Data fetched Successfully"
            })
        }else{
            res.status(400).json({
                message:"Cannot fetch data"
            })
        }
    } catch (error) {
        res.status(500).json({
            data:`Server Error: ${error.message}`
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskID = req.params.taskID;
        const getData = await taskModel.findOne({_id: taskID});
        const deleteTaskData = await taskModel.deleteOne({_id: taskID});
        if(deleteTaskData.acknowledged){
            res.status(200).json({
                data: getData,
                message: 'Data deleted successfully'
            })
        }else{
            res.status(400).json({
                message: "Cannot delete data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskID = req.params.taskID;
        // console.log(req.body,"req.body");
        const { status } = req.body;
        const allowedStatus = ['pending' , 'in-progress', 'completed'];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: 'Invalid status'
            })
        };

        const updateTaskData = await taskModel.updateOne({_id:taskID},{
            $set: {
                 status : status
            }
        })        
        const getData = await taskModel.findOne({_id:taskID})
        if(updateTaskData.acknowledged){
            res.status(200).json({
                data: getData,
                message:"Data Updated Successfully"
            })
        }else{
            res.status(400).json({
                message:"Cannot Update Data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

