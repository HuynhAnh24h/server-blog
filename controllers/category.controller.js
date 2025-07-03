import Category from "../models/category.model.js"
import { handleError } from "../helpers/handleError.js"

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body

    const existed = await Category.findOne({ $or: [{ name }, { slug }] })
    if (existed) return res.status(400).json({ message: "Đã tồn tại danh mục" })

    const newCategory = await Category.create({ name, slug })

    res.status(201).json({
      success: true,
      message: "Thêm danh mục thành công",
      data: newCategory,    
    })
  } catch (err) {
    console.error("Lỗi server:", err);
    return next(handleError(500, "Đã xảy ra lỗi khi thêm danh mục"));
  }
};

export const getAllCategory = async (req,res,next)=>{
  try{
    const response = await Category.find()
    if(response.length === 0){
      return res.status(400).json({success: false, message: "Không có dữ liệu"})
    }
    return res.status(200).json({
      success: true,
      data: response
    })
  }catch(error){
    console.log("Log Error:", error.message)
    next(handleError(500,"Lỗi máy chủ nội bộ"))
  }
}

export const getOneCategory = async (req, res, next) => {
  try {
    const { cte_id } = req.params;
    const response = await Category.findById(cte_id); // Trả về object hoặc null

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    return res.status(200).json({
      success: true,
      data: response
    });

  } catch (error) {
    console.log("Log Error:", error.message);
    return next(handleError(500, "Lỗi máy chủ nội bộ"));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { cte_id } = req.params;
    const { name, slug } = req.body;

    if (!cte_id) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ID danh mục cần cập nhật"
      });
    }

    const category = await Category.findByIdAndUpdate(
      cte_id,
      { name, slug },
      { new: true }
    );

    if (category) {
      return res.status(200).json({
        success: true,
        message:"Cập nhật thành công",
        data: category
      });
    }

    return res.status(404).json({
      success: false,
      message: "Không tìm thấy danh mục để cập nhật"
    });

  } catch (error) {
    console.error("Log Error:", error.message);
    return next(handleError(500, "Lỗi máy chủ nội bộ"));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { cte_id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(cte_id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục để xoá"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công"
    });

  } catch (error) {
    console.error("Lỗi khi xoá danh mục:", error.message);
    return next(handleError(500, "Lỗi máy chủ nội bộ"));
  }
};
