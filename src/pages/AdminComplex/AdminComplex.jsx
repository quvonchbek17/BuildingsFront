import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminComplex.css";


function AdminComplex() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [compName, setCompName] = useState("");
  const [address, setAddress] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [complexes, setcomplexes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState(1);

  const [postcompany, setPostComplex] = useState([]);

  useEffect(() => {
    if(test == 1){
        (async () => {
            await fetch("http://localhost:8000/companies")
              .then((res) => res.json())
              .then((data) => {
                setCompanies(data);
              });
          })();

          (async () => {
            await fetch("http://localhost:8000/complexes")
              .then((res) => res.json())
              .then((data) => {
                setcomplexes(data)
              });
          })();

          setTest(0)
      }

  }, [test]);


  const postComplex = async(e) => {
    e.preventDefault();
    e.target[0].value = ""
    e.target[1].value = ""

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: compName,
        address: address,
        companyId: companyId
      }),
    };
    await fetch("http://localhost:8000/complexpost", requestOptions)
      .then((res) => res.json())
      .then((data) => setPostComplex(data));

      setTest(1)

  }

  const deleteComplex = async(e) => {
    e.preventDefault()

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteId: e.target.id
        }),
      };
     await fetch("http://localhost:8000/complexdelete", requestOptions)
        .then((res) => res.json())
        .then((data) => setPostComplex(data));

        setTest(1)

  }

  return (
    <>
      <div className=" complexes d-flex  justify-content-center">
        <Button className=" add-btn" variant="primary" onClick={handleShow}>
          Qo'shish
        </Button>

        <div className="admin-links">
            <Link to='/admincompanies' className=" admin-link btn-outline-info text-decoration-none " >Kompaniyalar</Link>
            <Link to='/adminbanks' className=" admin-link btn-outline-info text-decoration-none " >Banklar</Link>
            <Link to='/adminrooms' className=" admin-link btn-outline-info text-decoration-none " >Xonalar</Link>
        </div>

        <ul className=" list-unstyled complexeslist">
            <li className="complex d-flex align-items-center justify-content-between m-2">
                 <p className="complex-desc text-start fw-bold complex_name name p-0 ">
                    Kompleks
                  </p>
                  <p className="complex-desc fw-bold p-0 ">
                    Address
                  </p>
                  <p className="complex-desc text-end fw-bold p-0 ">
                    O'chirish
                  </p>
            </li>
          {complexes.map((item) => {
            return (
              <li className="complex d-flex align-items-center justify-content-between m-2  ">

                  <p className="complex-desc text-start complex_name name p-0 ">
                    {item.complex_name}
                  </p>
                  <p className="complex-desc complex_name name p-0">
                    {item.complex_address}
                  </p>

               <div className="complex-desc text-end"><button onClick={e => deleteComplex(e)} id={item.complex_id} className=" btn btn-outline-danger">o'chirish</button></div>
              </li>
            );
          })}
        </ul>
      </div>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Kompleks qo'shish</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="postComp">
            <form className=" form d-flex flex-column align-items-center" onSubmit={(e) => postComplex(e)}>
              <input
                className=" form-control mb-3 "
                onChange={(e) => setCompName(e.target.value)}
                type="text"
                placeholder="Kompleks nomi"
              />
              <input
                className=" form-control mb-3"
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Joylashgan joyi"
              />
              <select onChange={e => setCompanyId(e.target.value)} className=" form-select mb-3" >
                <option value="">Kompaniyani tanlang</option>
                {
                    companies.map( item => {
                        return (
                            <option value={item.company_id}>{item.company_name}</option>
                        )
                    })
                }
              </select>
              <button className=" btn btn-outline-info">Qo'shish</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminComplex;
