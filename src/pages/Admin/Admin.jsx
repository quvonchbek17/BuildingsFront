import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css'
import { Link } from 'react-router-dom';

function Admin(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminTest, setAdminTest] = useState(false);
  const [token, setToken] = useState({});


  function loginUser(e){
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
  };
  fetch('http://localhost:8000/login', requestOptions)
      .then(res => res.json())
      .then(data => setToken(data));
  }
function fn(e){
    e.preventDefault()
    setAdminTest(false)
}
  useEffect(() => {
    if(token?.access_token){
        setAdminTest(true)
    }
  }, [token]);


  if(adminTest){
    return <>
        <div className='admin d-flex align-items-center justify-content-center'>


             <Link className=' adminBtns btn-outline-info m-3' to='/admincompanies'>Kompaniyalar</Link>
             <Link className=' adminBtns btn-outline-info m-3' to='/admincomplexes'>Komplekslar</Link>
             <Link className=' adminBtns btn-outline-info m-3' to='/adminbanks'>Banklar</Link>
             <Link to='/adminrooms' className="adminBtns btn-outline-info text-decoration-none " >Xonalar</Link>
            <button type='click' onClick={e => fn(e)} className='logoutbtn btn btn-primary'>Logout</button>
        </div>
    </>
  } else {

    return <>
    <div className=' login d-flex align-items-center justify-content-center'>
    <form onSubmit={e => loginUser(e)} class="login__form">
      <div className="login__username">
        <span><i className="fas fa-user"></i></span>
        <input onChange={e => setUsername(e.target.value)}
          className="input-login"
          type="text"
          placeholder="Username"
          name="login"
          autoComplete='off'
        />
      </div>
      <div className="login__username">
        <span><i className="fas fa-unlock"></i></span>
        <input
          onChange={e => setPassword(e.target.value) }
          className="input-password"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      {
        token.message == 'Xato' &&  <p id="loginError" className="login__error text-danger ">
        Login yoki parol xato !
      </p>
      }


      <button className="login__btn" type="submit">Login</button>
      <p className="login__forgot">Forgot password?</p>
    </form>
    </div>
  </>

  }





}


export default Admin