import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Signup = ()=>{
    const navigate= useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        let token = Cookies.get('token');
        if(token){
            navigate('/')
        }
    },[])

    const registerUser = async (e) => {
        e.preventDefault();
        let data = {
            name,
            email,
            password
        }
        try {
            let req = await fetch(`http://localhost:5000/api/register`, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            let res = await req.json();
            
            if (res.status === 'success') {
                console.log(res.message)
                navigate('/login')
            }
            if (res.status === 'failed') {
                console.log(res.message)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return <div className="form">
    <form onSubmit={(e) => registerUser(e)}>
        <h5 className="text-center">
            Register User
        </h5>
        <br />
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="email" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
        </div>
        <br />
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <br />
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required />
        </div>
        <br />
        <div className="font-bold">
            <Link to={'/login'}>Login</Link>
        </div>
        <br/>
        <div className="flex flex-row-reverse">
            <button type="submit" className="btn btn-primary">Register</button>
        </div>
    </form>
</div>
}

export default Signup