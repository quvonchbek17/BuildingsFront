import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminRoom.css";

function AdminRoom() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rooms, setRooms] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [complexes, setComplexes] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [complexId, setComplexId] = useState("");
  const [roomNum, setRoomNum] = useState(0);
  const [roomArea, setRoomArea] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  const [test, setTest] = useState(1);
  const [postroom, setPostRoom] = useState([]);


  if(test == 1){

    (
        async () => {
         await fetch('http://localhost:8000/allrooms').then(res => res.json()).then(data => setRooms(data))
        }
    )();

   }

  if(test == 1){

    (
        async () => {
         await fetch('http://localhost:8000/companies').then(res => res.json()).then(data => setCompanies(data))
        }
    )();
    setTest(0)
   }

   useEffect(() => {
    if(companyId !== ""){
        fetch(`http://localhost:8000/complexes/${companyId}`).then(res => res.json()).then(data => setComplexes(data))
    }
  }, [companyId]);

  const postRoom = async(e) => {
    e.preventDefault();

    e.target[3].value = ""
    e.target[4].value = ""

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_num: roomNum,
        room_area: roomArea,
        area_price: roomPrice,
        complex_id: complexId
      }),
    };
    await fetch("http://localhost:8000/roompost", requestOptions)
      .then((res) => res.json())
      .then((data) => setPostRoom(data));
      setTest(1)
  }

  const deleteRoom = async(e) => {
    e.preventDefault()

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deleteId: e.target.id
        }),
      };
     await fetch("http://localhost:8000/roomdelete", requestOptions)
        .then((res) => res.json())
        .then((data) => setPostRoom(data));
        setTest(1)
  }

  return (
    <>
      <div className=" rooms d-flex justify-content-center">
        <Button className=" add-btn" variant="primary" onClick={handleShow}>
          Qo'shish
        </Button>

        <div className="admin-links">
            <Link to='/admincompanies' className=" admin-link btn-outline-info text-decoration-none " >Kompaniyalar</Link>
            <Link to='/admincomplexes' className=" admin-link btn-outline-info text-decoration-none " >Komplekslar</Link>
            <Link to='/adminbanks' className=" admin-link btn-outline-info text-decoration-none " >Banklar</Link>
        </div>

        <ul className=" roomslist list-unstyled ">
            <li className="bank d-flex align-items-center justify-content-between m-2">
                 <p className=" room-desc fw-bold complex_name name p-0 ">
                    Kompaniya
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    Kompleks
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    Xona soni
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                   Maydoni (m<sup>2</sup>)
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    Narxi (m<sup>2</sup> uchun)
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    O'chirish
                  </p>
            </li>
          {rooms.map((item) => {
            return (
              <li className="room d-flex align-items-center justify-content-between m-2  ">
                <div className="room-desc d-flex flex-column align-items-center" >
                    <img src={item.logo_link}  width={70} height={70} />
                   <p className=" fw-bold room_name name p-0 ">
                    {item.company_name}
                  </p>
                </div>
                  <p className=" room-desc fw-bold p-0 ">
                    {item.complex_name}
                  </p>
                  <p className=" room-desc fw-bold p-0 ">
                    {item.room_num}
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    {item.room_area} m<sup>2</sup>
                  </p>
                  <p className="room-desc fw-bold p-0 ">
                    {item.area_price} so'm
                  </p>

                <div className="room-desc"><button onClick={e => deleteRoom(e)} id={item.room_id} className=" btn btn-outline-danger">o'chirish</button></div>
              </li>
            );
          })}
        </ul>
      </div>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Xona qo'shish</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="postComp">
            <form className=" form d-flex flex-column align-items-center" onSubmit={(e) => postRoom(e)}>

                 <select className=" form-select mb-3" onChange={e => setCompanyId(e.target.value * 1)}>
                  <option selected disabled>Kompaniyani tanlang</option>
                   {
                        companies.map( item => {
                            return <option value={item.company_id}>{item.company_name}</option>
                        })
                   }
                </select>

                <select className=" form-select mb-3" onChange={e => setComplexId(e.target.value * 1)}>
                  <option selected disabled>Kompleksni tanlang</option>
                   {
                        complexes.map( item => {
                            return <option value={item.complex_id}>{item.complex_name}</option>
                        })
                   }
                </select>

                <select onChange={e => setRoomNum(e.target.value * 1)} className=" form-select mb-3">
                    <option disabled selected >Xona soni</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
              <input
                className=" form-control mb-3 "
                onChange={(e) => setRoomArea(e.target.value * 1)}
                type="number"
                min={0}
                placeholder="Maydoni (m^2)"
              />
              <input
                className=" form-control mb-3"
                onChange={(e) => setRoomPrice(e.target.value * 1)}
                type="number"
                placeholder="Narxi (m^2 uchun)"
              />

              <button className=" btn btn-outline-info">Qo'shish</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminRoom;
