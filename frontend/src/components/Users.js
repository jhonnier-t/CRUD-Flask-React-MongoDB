import React, {useState} from "react"


const API = process.env.REACT_APP_API;


export const Users = () => {

    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const response = await fetch(API+"/users", {
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

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange =  {e => setName(e.target.value)}
                            value = {name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)}
                            value = {email}
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)}
                            value = {password}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <botton onClick={handleSubmit}  className="btn btn-primary btn-block" >
                            Create
                    </botton>
                </form>
            </div>
            <div className="col md-8">

            </div>
        </div>
    )
}