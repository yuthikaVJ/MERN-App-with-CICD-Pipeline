
import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useState, useEffect } from "react";
import React from "react";




const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get("http://13.214.132.22:5000/api/users")
            .then(response => {
                setUsers(response?.data?.response || []);

            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }

    const addUser = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name
        }
        Axios.post("/api/users", payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    }

    const updateUser = (data) => {

        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name
        }
        Axios.post("/api/users", payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });

    }

    const deleteUser = (data) => {
        Axios.post("/api/users", data)
            .then(() => {
                getUsers();
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });

    }

    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px',
            }}
        >
            <UserForm
                addUser={addUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
                updateUser={updateUser}
            />
            <UsersTable
                rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={data => window.confirm('Are you sure you want to delete this user?') && deleteUser(data)}
            />
        </Box>

    );

}

export default Users;