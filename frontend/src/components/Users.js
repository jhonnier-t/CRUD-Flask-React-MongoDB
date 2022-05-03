import React, {useState, useEffect} from "react"


const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const [users, setUsers] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const response = await fetch(`${API}/users`, {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify ({
                'name': name,
                'email':email,
                'password':password
            })
        })
        const data = await response.json();
        console.log(data)
    }

    const getUsers = async () => {
        const response = await fetch(`${API}/users`)
        const data = await response.json()
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group p-1">
                        <input 
                            type="text" 
                            onChange =  {e => setName(e.target.value)}
                            value = {name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group p-1">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)}
                            value = {email}
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group p-1">
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)}
                            value = {password}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button onClick={handleSubmit}  className="btn btn-primary btn-block" >
                            Create
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td className="card card-body">
                                    <button className="btn btn-secondary btn-sm btn-block">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm btn-block">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}