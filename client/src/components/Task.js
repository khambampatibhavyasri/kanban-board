import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPowerOff, FaHome } from "react-icons/fa";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { IoCloseCircleSharp } from "react-icons/io5";
const Task = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState();
    const [taskId, setTaskId] = useState();

    const deleteRef = useRef()
    const editRef = useRef()


    useEffect(() => {
        getAllTask()
    }, [])

    const logout = () => {
        Cookies.remove('token')
        navigate('/login')
    }


    const getAllTask = async () => {
        const req = await fetch(`http://localhost:5000/api/getTasks/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        const res = await req.json();
        if (res.status === 'success') {
            setTasks(res.data)
        }
    }

    const showDeleteProject = (e, item) => {
        e.preventDefault();
        setTaskId(item._id)
        deleteRef.current.style.display = "block"
    }

    const hideDeleteProject = (e) => {
        e.preventDefault();
        deleteRef.current.style.display = "none"
    }

    const deleteTask = async (e)=>{
        e.preventDefault()
        console.log()
        try {
            let req = await fetch(`http://localhost:5000/api/deleteTask/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                },
            })
            let res = await req.json();
            if (res.status === 'success') {
                editRef.current.style.display = "none"
                navigate('/login')
            }
            if (res.status === 'failed') {
                toast(res.message)
            }
        } catch (err) {
            toast(err)
        }

    }

    const showEditProject = (e, item) => {
        e.preventDefault();
        setTitle(item.title);
        setDescription(item.description)
        setStatus(item.status)
        setTaskId(item._id)
        editRef.current.style.display = "block"
    }

    const hideEditProject = (e) => {
        e.preventDefault();
        editRef.current.style.display = "none"
    }


    const saveTask = async (e) => {
        e.preventDefault()
        try {
            let req = await fetch(`http://localhost:5000/api/updateTask/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ title, description, status})
            })
            let res = await req.json();
            if (res.status === 'success') {
                editRef.current.style.display = "none"
                navigate('/login')
            }
            if (res.status === 'failed') {
                toast(res.message)
            }
        } catch (err) {
            toast(err)
        }

    }

    return <div className="container-fluid">
        <ToastContainer/>
        <div ref={deleteRef} className="popArea">
            <div className="popUpBox">
                <div className="d-flex flex-row-reverse">
                    <IoCloseCircleSharp className="h3" onClick={(e) => hideDeleteProject(e)} />
                </div>
                <div className="text-center">
                    Are you sure you want to delete this project
                </div>
                <br/>
                <div className="d-flex flex-row-reverse">
                    <button type="submit" onClick={(e)=>deleteTask(e, taskId)} className="btn btn-danger bg-danger">Delete</button>
                </div>
            </div>
        </div>



        <div ref={editRef} className="popArea">
            <div className="popUpBox">
                <div className="d-flex flex-row-reverse">
                    <IoCloseCircleSharp className="h3" onClick={(e) => hideEditProject(e)} />
                </div>
                <form onSubmit={(e) => saveTask(e)}>
                    <h5 className="text-center">
                        Edit Task
                    </h5>
                    <br />
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter Name" required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required>
                        
                        </textarea>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="description">Status</label>
                        <select className="form-control" onChange={(e)=>setStatus(e.target.value)} defaultValue={status}>
                            <option value="to do" selected={status === 'to do' ? true: null} >To Do</option>
                            <option value="in-progress" selected={status === 'in-progress' ? true: null}>In-process</option>
                            <option value="done" selected={status === 'done' ? true: null}>Done</option>
                        </select>
                    </div>
                    <br/>
                    <div className="d-flex flex-row-reverse">
                        <button type="submit" className="btn btnPr">Save</button>
                    </div>
                </form>
            </div>
        </div>






        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between">
                    <div className="align-items-center p-1 h2">
                        <Link to='/'><FaHome className="text-danger"/></Link>
                    </div>
                    <div className="my-2 d-flex flex-row-reverse align-items-center">
                        <FaPowerOff onClick={(e) => logout(e)} className="mx-3 text-danger" />
                        <Link to={`/addTask/${id}`} className="btn btnPr">ADD</Link>
                    </div>
                </div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Create At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((item, index) => {
                                    return <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                        <FaTrash onClick={(e) => showDeleteProject(e, item)} className="m-1 text-danger" />
                                        <FaEdit onClick={(e) => showEditProject(e, item)} className="m-1 text-success" />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default Task;
