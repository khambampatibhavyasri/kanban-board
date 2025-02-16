import { useState } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
const AddTask = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token')
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const registerProject = async (e) => {
        e.preventDefault();
        try {
            let req = await fetch(`http://localhost:5000/api/addTask`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({title, description, id})
            })
            let res = await req.json();
            if (res.status === 'success') {
                navigate(`/task/${id}`)
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
        <form onSubmit={(e) => registerProject(e)}>
            <h5 className="text-center">
                Add Task
            </h5>
            <br />
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" onChange={(e) => setTitle(e.target.value)} placeholder="Enter Name" required />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required>

                </textarea>
            </div>
            <br />
            <br />
            <div className="d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary">ADD</button>
            </div>
        </form>
    </div>
}

export default AddTask;
