const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Thêm cors
require('dotenv').config();

const Student = require('./models/Student');

const app = express();
app.use(cors()); // Bật CORS cho phép React kết nối
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// API GET: Hello (Bổ sung cho Câu 45)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Docker Backend!' });
});

// API POST: Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

// API GET: Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

// API PUT: Cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: 'Không tìm thấy sinh viên!' });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

// API DELETE: Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Không tìm thấy sinh viên!' });
    res.status(200).json({ message: 'Đã xóa sinh viên thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server:', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});