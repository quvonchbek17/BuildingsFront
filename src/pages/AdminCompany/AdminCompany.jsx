import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminCompany.css";
function AdminCompany() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [compName, setCompName] = useState("");
  const [logoLink, setLogoLink] = useState("");
  const [companies, setCompanies] = useState([]);
  const [postcompany, setPostCompany] = useState([]);
  const [test, setTest] = useState(1);

  useEffect(() => {
    if(test == 1){
        (async () => {
            await fetch("http://localhost:8000/companies")
              .then((res) => res.json())
              .then((data) => {
                setCompanies(data);
              });
          })();

          setTest(0)
      }

  }, [test]);



  const postCompany = async(e) => {
    e.preventDefault();
    e.target[0].value = ""
    e.target[1].value = ""
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: compName,
        link: logoLink,
      }),
    };
    await fetch("http://localhost:8000/companypost", requestOptions)
      .then((res) => res.json())
      .then((data) => setPostCompany(data));

      setTest(1)
  }

  const deleteCompany = async(e) =>{
    e.preventDefault()

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteId: e.target.id
        }),
      };
     await fetch("http://localhost:8000/companydelete", requestOptions)
        .then((res) => res.json())
        .then((data) => setPostCompany(data));
        setTest(1)
  }

  return (
    <>
      <div className=" companies d-flex  justify-content-center">
        <div className="admin-links">
            <Link to='/admincomplexes' className=" admin-link btn-outline-info text-decoration-none " >Komplekslar</Link>
            <Link to='/adminbanks' className=" admin-link btn-outline-info text-decoration-none " >Banklar</Link>
            <Link to='/adminrooms' className=" admin-link btn-outline-info text-decoration-none " >Xonalar</Link>
        </div>
        <Button className=" add-btn" variant="primary" onClick={handleShow}>
          Qo'shish
        </Button>

        <ul className=" list-unstyled ">
          {companies.map((item) => {
            return (
              <li className="company d-flex align-items-center justify-content-between m-2  ">
                <div className=" d-flex">
                  <img src={item.logo_link} width={70} height={70} />
                  <p className=" company_name name p-0 m-4">
                    {item.company_name}
                  </p>
                </div>
                <button onClick={e => deleteCompany(e)} id={item.company_id} className=" btn btn-outline-danger">o'chirish</button>
              </li>
            );
          })}
        </ul>
      </div>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Kompaniya qo'shish</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="postComp">
            <form className=" form d-flex flex-column align-items-center" onSubmit={(e) => postCompany(e)}>
              <input
                className=" form-control mb-3 "
                onChange={(e) => setCompName(e.target.value)}
                type="text"
                placeholder="Kompaniya nomi"
              />
              <input
                className=" form-control mb-3"
                onChange={(e) => setLogoLink(e.target.value)}
                type="text"
                placeholder="Logotip linki"
              />
              <button className=" btn btn-outline-info">Qo'shish</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminCompany;
