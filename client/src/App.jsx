import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const backendUrl = window.location.origin.replace('-5173', '-5000');
  const API_URL = `${backendUrl}/api/students`;

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setFormData({ studentId: '', name: '', email: '' });
    setEditingId(null);
    fetchStudents();
  };

  const handleEdit = (st) => {
    setEditingId(st._id);
    setFormData({ studentId: st.studentId, name: st.name, email: st.email });
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản Lý Sinh Viên</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input type="text" name="studentId" placeholder="Mã SV" value={formData.studentId} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Họ Tên" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Cập Nhật' : 'Thêm Sinh Viên'}</button>
      </form>

      <h2>Danh Sách Sinh Viên</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td>
                <button onClick={() => handleEdit(st)}>Sửa</button>
                <button onClick={() => handleDelete(st._id)} style={{ marginLeft: '5px' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;