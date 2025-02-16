import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Protected = (props)=>{
    const {Cmp} = props;
    let navigate = useNavigate();
    useEffect(()=>{
        let isLogin = Cookies.get('token');
        if(!isLogin){
            navigate('/login')
        }
    },[]);
    return <div>
        <Cmp/>
    </div>
}
export default Protected;