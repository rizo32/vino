import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosClient.get(`/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
      {/* Add other user information as needed */}
    </div>
  );
}

export default UserView;