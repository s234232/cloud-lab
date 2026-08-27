const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Tự động quản lý createdAt và updatedAt
  }
);

// Thêm 'students' làm tham số thứ 3 để chỉ định chính xác tên collection trên MongoDB Atlas
module.exports = mongoose.model('Student', studentSchema, 'students');