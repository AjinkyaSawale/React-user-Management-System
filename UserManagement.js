import React, { useState, useEffect } from "react";
import "./App.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      alert("Please enter username, email, and role.");
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ username: "", email: "", role: "" });
  };
  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const editUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, email: user.email, role: user.role });
  };

  const updateUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      alert("Please enter username, email, and role.");
      return;
    }
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setNewUser({ username: "", email: "", role: "" });
  };

  return (
    <div className="container">
      <h1>User Accounts</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Role"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
        />
        {editingUser ? (
          <button onClick={updateUser}>Update</button>
        ) : (
          <button onClick={addUser}>Add</button>
        )}
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <div className="actions">
              <button onClick={() => editUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { UserManagement };
