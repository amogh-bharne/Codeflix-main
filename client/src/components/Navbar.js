import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/userActions';
import {useEffect} from 'react';
const Navbar = () => {
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo}= userLogin;
    useEffect(() => {}, [userInfo]);
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };



    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"sticky"}}>
        <div className="container-fluid">
            <Link className="navbar-brand fs-4" to="/">CodeFlix</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            {userInfo && (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active text-warning" aria-current="page" href="/home">Home</a>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/workspace">Workspace</Link>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-item btn link-warning" to="/newProject">
                    Create +
                </Link>
                </li>
            </ul>
            <form className="d-flex">
                <button className="btn btn-outline-warning" onClick={logoutHandler}>Logout</button>
            </form>
            </div>
            )} 
        </div>
        </nav>
    )};

export default Navbar;