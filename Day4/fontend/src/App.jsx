import { useEffect, useState } from 'react';

function App() {
  const [users, Setusers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);
      Setusers(data); // Update state with fetched users
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h1>firstname: {user.first_name}</h1>
          <h1>email: {user.email}</h1>
        </div>
      ))}
    </div>
  );
}

export default App
