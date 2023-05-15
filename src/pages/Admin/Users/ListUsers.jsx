import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListUsers = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const getUsers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getusers`, requestOptions);
    const result = await response.json();

    if (result.users) {
      setUsers(result.users);
    }
  };

  return (
    <Container>
      <h1>Show users</h1>
      <ul className="list-unstyled data-list mt-3">
        <li className="data-list-header data-item mb-2">
          <span className="list-name">Name</span>
          <span className="list-email">Email</span>
          <span className="list-userrole">Role</span>
          <span className="list-usertype">Type</span>
          <span className="list-actions"></span>
        </li>
        {users.map((user) => {
          return (
            <li className="data-item p-1 align-items-center border-top" key={user.id}>
              <span className="list-name">{`${user.firstName} ${user.lastName}`}</span>
              <span className="list-email">{user.email}</span>
              <span className="list-userrole">{user.userRole}</span>
              <span className="list-usertype">{user.userType}</span>
              <span className="list-actions d-flex justify-content-end">
                <Link to={`/dashboard/admin/users/user/${user.id}`} className="btn btn-primary">Detalii</Link>
              </span>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default ListUsers;
