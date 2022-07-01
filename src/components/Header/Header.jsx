import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
function Header(){
    return <>
        <div className=' header_container header d-flex justify-content-between align-items-center'>
            <a href="" className=' text-decoration-none fs-2 fw-bold text-light'>Najot House</a>
            <div>
            <Link to='/' className='login-link text-decoration-none text-light btn-primary me-3'>Home</Link>
            <Link to='/admin' className='login-link text-decoration-none text-light btn-primary '>Login</Link>
            </div>
        </div>
    </>
}

export default Header