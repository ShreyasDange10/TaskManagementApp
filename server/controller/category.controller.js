import categoryModel from "../model/category.model";

export const addCategories = async (req, res) => {
    try {
        const { name, userID } =  req.body;
        const addCategory = new categoryModel({
            name,
            userID
        });

        const newCategory = await addCategory.save();

        if(newCategory){
            return res.status(200).json({
                data : addCategory,
                message: 'Category added successfully',
                code: 200
            })
        }else{
            res.status(400).json({
                data:[],
                message: 'Could not add Category',
                code:400
            })
        }
    } catch (error) {
        res.status(500).json({
            data:[],
            message: `Server error: ${error.message}`,
            code:500
        })
    }
};

export const getCategories = async (req, res) => {
    try {
        const getCategory = await categoryModel.find();
        res.status(200).json({
            data: getCategory,
            message: "Category Data fetched successfully"
        });

        res.status(400).json({
            data:[],
            message: 'Cannot fetch category data'
        })
    } catch (error) {
        res.status(500).json({
            data:[],
            message:` Server error: ${error.message}`
        })
    }
};

export const deleteCategories = async (req, res) =>{
    try {
        const categoryID = req.params.id    
        const deleteCategory = await categoryModel.updateOne(
            {_id: categoryID},
                {$set: 
                    {
                    isDeleted : true
                }
            }
        );

        if(deleteCategory.acknowledged){
            res.status(200).json({
                data: deleteCategory,
                message: 'Category deleted successfully'
            })
        }else{
            res.status(400).json({
                data:[],
                message: 'Cannot delete successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            data:[],
            message:`Server error: ${error.message}`
        })
    }
}