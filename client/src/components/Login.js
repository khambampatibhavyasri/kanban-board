import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
const Login = ()=>{
    const navigate = useNavigate();


    useEffect(()=>{
        let token = Cookies.get('token');
        if(token){
            navigate('/')
        }
    },[])

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSave = async (e) => {
        e.preventDefault();
        try {
            let req = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            let res = await req.json();
            if (res.status === 'success') {
                Cookies.set('token', res.token);
                navigate('/')
            }
            if (res.status === 'failed') {
                toast(res.message)
            }
        } catch (err) {
            toast(err)
        }
    }

    return <div className="form">
        <ToastContainer/>
    <form onSubmit={(e) => loginSave(e)}>
        <h5 className="text-center">
            Login
        </h5>
        <br />
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <br />
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <br />
        <div className="font-bold">
            <Link to={'/signup'}>SignUp</Link>
        </div>
        <br/>
        <div className="flex flex-row-reverse">
            <button type="submit" className="btn btn-primary">Login</button>
        </div>
    </form>
    </div>
}
export default Login;