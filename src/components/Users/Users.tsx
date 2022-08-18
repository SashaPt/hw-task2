import React, {ChangeEvent, FC, useState, useMemo, FormEvent } from 'react';
import { IUser } from './IUser';
import { initialUser } from './initialUser';
import {USERS} from './usersData';

const Users:FC = () => {
    const [users, setUsers] = useState<IUser[]>(USERS);
    const deleteUser = (id:number) => {
        const isDelete = window.confirm("Do you really want to delete this user?");
        if (isDelete) {
            setUsers(users.filter(user => id !== user.id));
        }
    };
    {/*let [searchedUsers, setSearchedUsers] = useState(users);
    const searchUser = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            searchedUsers = users.slice(0);
            setSearchedUsers(searchedUsers.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setSearchedUsers(users);
        }
    }*/}
    const [search, setSearch] = useState('');
    const searchedUsers = useMemo (() => {
        if (search) {
            return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
        }
        return users;
    }, [search, users]);

    const [showUserForm, setShowUserForm] = useState(false);

    const [user, setUser] = useState(initialUser);
    const onChangeUserData = (event:ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        setUser({...user, [field]:event.target.value})
    };

    const addUser = (event: FormEvent) => {
        event.preventDefault();
        setUsers([...users, user]);
        setUser(initialUser);
    }
    
    return (
        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Search</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
            onChange={(event) => setSearch(event.target.value)}
            />
        </div>
        <button className="btn btn-success my-3"
        onClick={() => setShowUserForm(!showUserForm)}>Add new user</button>
        {showUserForm && 
        <form className="mb-3"
        onSubmit={(event) => addUser(event)}>
            {Object.keys(user).map(field => {
                if (field === "id" || field === "address" || field === "company") return;
                return <div className="mb-3" key={field}>
                    <label htmlFor="field" className="form-label">{field}</label>
                    <input type="text" className="form-control" id={field} required
                    value={user[field as keyof Omit<IUser, 'id'| 'address' | 'company'>]}
                    onChange={(event) => onChangeUserData(event)}/>
                </div>
            })}        
            <button type="submit" className="btn btn-primary">Add</button>
      </form>
      }
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {/*{searchedUsers.length
            ?
            searchedUsers.map(user =>*/} 
            {searchedUsers.length 
            ?
            searchedUsers.map(user =>
            <div className="col" key={user.id}>{/*ключ в верхнем теге*/}
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">N{user.id} - {user.name}</h5>
                        <p className="card-text">Email: {user.email}</p>
                        <p className="card-text">Phone: {user.phone}</p>
                        <p className="card-text">Website: {user.website}</p>
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
