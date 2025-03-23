"use client";
import { actionAddUser } from "@/lib/action";
import { deleteUser, getUsers } from "@/lib/storage";
import { useState, useEffect } from "react";
import { useActionState } from "react";

export default function Home() {
  const [state, formAction] = useActionState(actionAddUser, {message: null});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(state.message == "Yeeppii") {
      setEditing(false)
    }
      fetchUsers();
  
  }, [state.message]);
  

  // Отримати список користувачів
  const fetchUsers = async () => {
 
    setLoading(true);
    try {
      const res = await getUsers();
      console.log(res.recordset);

      setUsers(res.recordset);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Додавання або оновлення користувача
  const handleSubmit = async (e) => {
   setEditing()
  };

  // Видалення користувача
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();

  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      {/* Форма для додавання/редагування */}
      <form action={formAction} className="mb-6">
        <input
        name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-2 border rounded mr-2"
        />
        <input
        name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="p-2 border rounded mr-2"
        />
        <input hidden name="isEditing" value={editing}></input>
        <input hidden name="id" value={form.id}></input>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          {editing ? "Update" : "Add"}
        </button>
        {state.message && <p>{state.message}</p>}
      </form>

      {/* Таблиця користувачів */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => {
                      setForm(user);
                      setEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
