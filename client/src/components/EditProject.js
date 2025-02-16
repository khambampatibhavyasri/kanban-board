import { useState } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const EditProject = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const saveProject = async (e) => {
        e.preventDefault();
        e.preventDefault();
        try {
            let req = await fetch(`http://localhost:5000/api/addproject`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description})
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
        <form onSubmit={(e) => saveProject(e)}>
            <h5 className="text-center">
                Edit Project
            </h5>
            <br />
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="email" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required>

                </textarea>
            </div>
            <br />
            <br />
            <div className="flex flex-row-reverse">
                <button type="submit" className="btn btn-primary">ADD</button>
            </div>
        </form>
    </div>
}

export default EditProject;
