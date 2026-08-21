import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });

  // Tự động lấy URL domain của Codespaces để gọi sang port 5000
  const backendUrl = window.location.origin.replace('-5173', '-5000');
  const API_URL = `${backendUrl}/api/students`;

  // Câu 47: Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Câu 49: Gửi dữ liệu tạo sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Thêm sinh viên thành công!');
        setFormData({ studentId: '', name: '', email: '' });
        fetchStudents();
      } else {
        alert('Thêm thất bại! Kiểm tra lại Mã SV hoặc Email xem có bị trùng không.');
      }
    } catch (error) {
      console.error('Lỗi gửi dữ liệu:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản Lý Sinh Viên</h1>

      {/* Câu 48: Form nhập dữ liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="Mã SV"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Họ Tên"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Câu 47: Hiển thị danh sách */}
      <h2>Danh Sách Sinh Viên</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;