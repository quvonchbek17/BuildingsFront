import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminBank.css";

function AdminBank() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [bankName, setBankName] = useState("");
  const [logo, setLogo] = useState("");
  const [maxCredit, setMaxCredit] = useState("");
  const [startPayment, setStartPayment] = useState("");
  const [duration, setDuration] = useState("");
  const [service, setService] = useState("");
  const [banks, setBanks] = useState([]);
  const [test, setTest] = useState(1);
  const [postcompany, setPostBank] = useState([]);

  useEffect(() => {
    if(test == 1){
        (async () => {
            await fetch("http://localhost:8000/banks")
              .then((res) => res.json())
              .then((data) => {
                setBanks(data);
              });
          })();

          setTest(0)
      }

  }, [test]);


  const postBank = async(e) => {
    e.preventDefault();
    e.target[0].value = ""
    e.target[1].value = ""
    e.target[2].value = ""
    e.target[3].value = ""
    e.target[4].value = ""
    e.target[5].value = ""

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: bankName,
        logo: logo,
        maxCredit: maxCredit,
        startPayment: startPayment,
        duration: duration,
        service: service
      }),
    };
    await fetch("http://localhost:8000/bankpost", requestOptions)
      .then((res) => res.json())
      .then((data) => setPostBank(data));
      setTest(1)
  }

  const deleteBank = async(e) => {
    e.preventDefault()

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteId: e.target.id
        }),
      };
     await fetch("http://localhost:8000/bankdelete", requestOptions)
        .then((res) => res.json())
        .then((data) => setPostBank(data));

        setTest(1)

  }

  return (
    <>
      <div className=" banks d-flex justify-content-center">
        <Button className=" add-btn" variant="primary" onClick={handleShow}>
          Qo'shish
        </Button>

        <div className="admin-links">
            <Link to='/admincompanies' className=" admin-link btn-outline-info text-decoration-none " >Kompaniyalar</Link>
            <Link to='/admincomplexes' className=" admin-link btn-outline-info text-decoration-none " >Komplekslar</Link>
            <Link to='/adminrooms' className=" admin-link btn-outline-info text-decoration-none " >Xonalar</Link>
        </div>

        <ul className=" bankslist list-unstyled ">
            <li className="bank d-flex align-items-center justify-content-between m-2">
                 <p className=" bank-desc fw-bold complex_name name p-0 ">
                    Bank nomi
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    Maximal credit
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    Boshlang'ish to'lov
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    Kredit muddati
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    Bank xizamti
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    O'chirish
                  </p>
            </li>
          {banks.map((item) => {
            return (
              <li className="bank d-flex align-items-center justify-content-between m-2  ">

                <div className="bank-desc d-flex flex-column align-items-center" >
                    <img src={item.logo_link}  width={70} height={70} />
                   <p className=" fw-bold complex_name name p-0 ">
                    {item.bank_name}
                  </p>
                </div>
                  <p className=" bank-desc fw-bold p-0 ">
                    {item.max_credit} so'm
                  </p>
                  <p className=" bank-desc fw-bold p-0 ">
                    {item.starting_payment} %
                  </p>
                  <p className="bank-desc fw-bold p-0 ">
                    {item.mortgage_duration} yil
                  </p>
                  <p className="bank-desc fw-bold p-0 ">
                    {item.bank_service} so'm
                  </p>

                <div className=" bank-desc"><button onClick={e => deleteBank(e)} id={item.bank_id} className=" btn btn-outline-danger">o'chirish</button></div>
              </li>
            );
          })}
        </ul>
      </div>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Bank qo'shish</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="postComp">
            <form className=" form d-flex flex-column align-items-center" onSubmit={(e) => postBank(e)}>
              <input
                className=" form-control mb-3 "
                onChange={(e) => setBankName(e.target.value)}
                type="text"
                placeholder="Bank nomi"
              />
              <input
                className=" form-control mb-3"
                onChange={(e) => setLogo(e.target.value)}
                type="text"
                placeholder="Logotip linki"
              />
                <input
                className=" form-control mb-3"
                onChange={(e) => setMaxCredit(e.target.value)}
                type="number"
                min={0}
                placeholder="Maximal kredit (so'm)"
              />
                            <input
                className=" form-control mb-3"
                onChange={(e) => setStartPayment(e.target.value)}
                type="number"
                min={0}
                max={100}
                placeholder="Boshlang'ich to'lov (%)"
              />
                <input
                className=" form-control mb-3"
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                min={0}
                max={50}
                placeholder="Kredit muddati (yil)"
              />
                <input
                className=" form-control mb-3"
                onChange={(e) => setService(e.target.value)}
                type="number"
                min={0}
                placeholder="Bank xizmati (so'm)"
              />

              <button className=" btn btn-outline-info">Qo'shish</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminBank;
