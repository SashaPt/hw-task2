import React, {ChangeEvent, FC, useState } from 'react';
import { IUser } from './IUser';
import {USERS} from './usersData';

const Users:FC = () => {
    const [users, setUsers] = useState<IUser[]>(USERS);
    const deleteUser = (id:number) => {
        const isDelete = window.confirm("Do you really want to delete this user?");
        if (isDelete) {
            setUsers(users.filter(user => id !== user.id));
        }
    }
    
    return (
        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Search</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
            
            >
            </input>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {users.length 
            ?
            users.map(user =>
            <div className="col" key={user.id}>{/*ключ в верхнем теге*/}
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">N{user.id} - {user.name}</h5>
                        <p className="card-text">Email: {user.email}</p>
                        <p className="card-text">City: {user.address.city}</p>
                        <p className="card-text">Company: {user.company.name}</p>
                    </div>
                    <div className="card-footer">
                        <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>DELETE</button>
                    </div>
                </div>
            </div>
            )
            :
            <h2 className="text-center">Users don't exist</h2>
        }
        </div>
        </>
    );
};

export default Users;
