import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPowerOff } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
    const deleteRef = useRef()
    const editRef = useRef()
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();
    const [id, setId] = useState();
    let [todo, setTodo] = useState([]);
    let [inProg, setInprog] = useState([]);
    let [done, setDone] = useState([]);

    useEffect(() => {
        getProjects();
    }, [])

    const getProjects = async () => {
        const req = await fetch('http://localhost:5000/api/getProjects', {
            headers: {
                'Authorization': `${token}`
            }
        });
        const res = await req.json();
        if (res.status === 'success') {
            const tod = res.data.filter(data => data.status === 'to do');
            const inp = res.data.filter(data => data.status === 'in-progress');
            const don = res.data.filter(data => data.status === 'done');
            setTodo(tod)
            setInprog(inp);
            setDone(don)
        }
    }



    const logout = () => {
        Cookies.remove('token')
        navigate('/login')
    }


    const showDeleteProject = (e, item) => {
        e.preventDefault();
        setId(item._id)
        deleteRef.current.style.display = "block"
    }

    const hideDeleteProject = (e) => {
        e.preventDefault();
        deleteRef.current.style.display = "none"
    }

    const deleteProject = async (e)=>{
        e.preventDefault()
        try {
            let req = await fetch(`http://localhost:5000/api/deleteProject/${id}`, {
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
        setName(item.name);
        setDescription(item.description)
        setStatus(item.status)
        setId(item._id)
        editRef.current.style.display = "block"
    }

    const hideEditProject = (e) => {
        e.preventDefault();
        editRef.current.style.display = "none"
    }


    const saveProject = async (e) => {
        e.preventDefault()
        try {
            let req = await fetch(`http://localhost:5000/api/updateProject/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ name, description, status})
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

    const showTask = (e, item)=>{
        navigate(`task/${item._id}`)
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
                    <button type="submit" onClick={(e)=>deleteProject(e, id)} className="btn btn-danger bg-danger">Delete</button>
                </div>
            </div>
        </div>


        <div ref={editRef} className="popArea">
            <div className="popUpBox">
                <div className="d-flex flex-row-reverse">
                    <IoCloseCircleSharp className="h3" onClick={(e) => hideEditProject(e)} />
                </div>
                <form onSubmit={(e) => saveProject(e)}>
                    <h5 className="text-center">
                        Edit Project
                    </h5>
                    <br />
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" required />
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
            <div className="col-12 dashBox">
                <div>
                    <div className="my-2 d-flex flex-row-reverse align-items-center">
                        <FaPowerOff onClick={(e) => logout(e)} className="mx-3 text-danger" />
                        <Link to='/addProject' className="btn btnPr">ADD</Link>
                    </div>
                </div>
                <div className="container overflow-hidden">
                    <div className="row gy-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="p-3 border bg-light">
                                <p>to-do</p>
                                {
                                    todo.map((item, index) => {
                                        return <div className="pBox" key={index} >
                                            <div onClick={(e)=>showTask(e, item)}>
                                            <h5>
                                                {item.name}
                                            </h5>
                                            <p>Status : {item.status}</p>
                                            </div>
                                            
                                            <div className="d-flex flex-row-reverse p-2">
                                                <FaTrash onClick={(e) => showDeleteProject(e, item)} className="m-1 text-danger" />
                                                <FaEdit onClick={(e) => showEditProject(e, item)} className="m-1 text-success" />
                                            </div>
                                        </div>
                                    })
                                }


                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="p-3 border bg-light">
                                <p>in-progress</p>
                                {
                                    inProg.map((item, index) => {
                                        return <div className="pBox" key={index} >
                                            <div onClick={(e)=>showTask(e, item)}>
                                            <h5>
                                                {item.name}
                                            </h5>
                                            <p>Status : {item.status}</p>
                                            </div>
                                            <div className="d-flex flex-row-reverse p-2">
                                            <FaTrash onClick={(e) => showDeleteProject(e, item)} className="m-1 text-danger" />
                                            <FaEdit onClick={(e) => showEditProject(e, item)} className="m-1 text-success" />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="p-3 border bg-light">
                                <p>done</p>
                                {
                                    done.map((item, index) => {
                                        return <div className="pBox" key={index} >
                                            <div onClick={(e)=>showTask(e, item)}>
                                            <h5>
                                                {item.name}
                                            </h5>
                                            <p>Status : {item.status}</p>
                                            </div>
                                            <div className="d-flex flex-row-reverse p-2">
                                            <FaTrash onClick={(e) => showDeleteProject(e, item)} className="m-1 text-danger" />
                                            <FaEdit onClick={(e) => showEditProject(e, item)} className="m-1 text-success" />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Home