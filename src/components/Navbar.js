import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {

  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
const navigate = useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("authToken");
  navigate('/login');

  
}
const loadCart = () => {
  setCartView(true)
}

const items = useCart();
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">myFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        {(localStorage.getItem("authToken"))?
        <div className='d-flex'>
             <li className="nav-item">
        <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
      </li>

    <li className="nav-item">
    <Link className="nav-link active fs-5 " aria-current="page" to="/myorder">My Orders</Link>
    </li>

        </div>
       

        :""}
        
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className="d-flex">
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/Signup">SignUp</Link>
      </div>
      :<div> 

    <div className="btn bg-white text-success mx-2" onClick={loadCart}>
        Cart {" "}
        <Badge  color="secondary">{items.length}
        </Badge>
      </div>
      {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> :""}

      <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
        Logout
      </div>
      </div>
       
    }
    </div>
  </div>
</nav>
    </div>
  )
}
