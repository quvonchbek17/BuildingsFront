
import { useState, useEffect } from 'react'
import './Home.css'



function Home(){


const [companies, setCompanies] = useState([]);
const [foundCompany, setFoundCompany] = useState([]);
const [complexes, setComplexes] = useState([]);
const [foundComplex, setFoundComplex] = useState([]);
const [foundBank, setFoundBank] = useState([]);
const [rooms, setRooms] = useState([]);
const [foundRoom, setFoundRoom] = useState([]);
const [duration, setDuration] = useState([]);
const [year, setYear] = useState("");
const [companyId, setCompanyId] = useState("");
const [complexId, setComplexId] = useState("");
const [roomId, setRoomId] = useState("");
const [test, setTest] = useState(1);




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
            fetch(`http://localhost:8000/companies/${companyId}`).then(res => res.json()).then(data => setFoundCompany(data))
        }
      }, [companyId]);

      useEffect(() => {
        if(companyId !== ""){
            fetch(`http://localhost:8000/rooms/${complexId}`).then(res => res.json()).then(data => setRooms(data))
            fetch(`http://localhost:8000/foundcomplexes/${complexId}`).then(res => res.json()).then(data => setFoundComplex(data))
        }
      }, [complexId]);


      useEffect(() => {
        if(roomId !== ""){
            fetch(`http://localhost:8000/mortgageduration`).then(res => res.json()).then(data => setDuration(data))
            fetch(`http://localhost:8000/foundroom/${roomId}`).then(res => res.json()).then(data => setFoundRoom(data))
        }
      }, [roomId]);

      useEffect(() => {
        if(year !== ""){
            fetch(`http://localhost:8000/bankscredit/${roomId}/${year}`).then(res => res.json()).then(data => setFoundBank(data))
        }
      }, [year]);



    return <>
        <div className="home d-flex flex-column align-items-center">
            <h1 className=" text-center">Filtrlash orqali uyni tanlang</h1>
            <form className=' form d-flex align-items-center justify-content-center mb-5' action="">
                <select onChange={e => setCompanyId(e.target.value)}>
                  <option selected disabled>Kompaniyani tanlang</option>
                   {
                        companies.map( item => {
                            return <option value={item.company_id}>{item.company_name}</option>
                        })
                   }
                </select>

                <select onChange={e => setComplexId(e.target.value)}>
                  <option selected disabled>Kompleksni tanlang</option>
                   {
                        complexes.map( item => {
                            return <option value={item.complex_id}>{item.complex_name}</option>
                        })
                   }
                </select>

                <select onChange={e => setRoomId(e.target.value)} >
                  <option selected disabled>Xona sonini tanlang</option>
                   {
                        rooms.map( item => {
                            return <option value={item.room_id}>{item.room_num}</option>
                        })
                   }
                </select>

                <select onChange={ e => setYear(e.target.value)} >
                  <option selected disabled>Kredit muddatini tanlang</option>
                   {
                        duration.map( item => {
                            return <option value={item.mortgage_duration}>{item.mortgage_duration} yil</option>
                        })
                   }
                </select>

            </form>

            <div className='House-body d-flex align-items-center justify-content-center'>
                   <div className=' d-flex flex-column align-items-center m-3'>
                       <img className='' src={foundCompany[0]?.logo_link} alt="" width={100} height={100} />
                       <p className=' m-0 text-center text-primary'>{foundCompany[0]?.company_name}</p>
                       <p className=' m-0 text-center text-success'>{foundComplex[0]?.complex_name}</p>
                        {

                            foundRoom.map(room => {
                                return ( <div> <p className=' m-0 text-center text-success'>Xona soni: {room?.room_num}</p>
                                <p className=' m-0 text-center text-success'>Narxi (m<sup>2</sup> uchun): {room?.area_price} so'm</p>
                                <p className=' m-0 text-center text-success'>Maydoni: {room?.room_area} m<sup>2</sup></p></div>)
                            })



                        }

                   </div>

                   <div className='d-flex flex-column align-items-center m-3'>
                        <img src={foundBank[0]?.logo_link} width={100} height={100}  />
                        <p className=' m-0 text-center text-primary'>{foundBank[0]?.bank_name}</p>
                        {
                            foundBank.map(bank => {
                                return(
                                    <div>
                                        <p className=' m-0 text-center text-success'>Max kredit: {bank?.max_credit} so'm</p>
                                        <p className=' m-0 text-center text-success'>Kredit muddati: {bank?.mortgage_duration} yil</p>
                                        <p className=' m-0 text-center text-success'>Boshlang'ish to'lov: {bank?.starting_payment} %</p>
                                        <p className=' m-0 text-center text-success'>Bank xizmati: {bank?.bank_service} so'm</p>
                                    </div>
                                )
                            })
                        }

                   </div>

                   <div className='d-flex flex-column align-items-center m-3'>
                        {
                            foundBank.map(bank => {
                                return(
                                    <div>
                                        <p className=' m-0 text-center text-success'>Uy narxi: {bank?.houseprice} so'm</p>
                                        <p className=' m-0 text-center text-success'>Boshlang'ich to'lov: {bank?.startmoney} so'm</p>
                                        <p className=' m-0 text-center text-success'>Oylik to'lov: {bank?.monthpayment} so'm</p>
                                        <p className=' m-0 text-center text-success'>Bank xizmati: {bank?.bank_service} so'm</p>
                                        <p className=' m-0 text-center text-success'>Kredit muddati: {bank?.mortgage_duration} yil</p>
                                    </div>
                                )
                            })
                        }

                   </div>
            </div>
        </div>

    </>
}

export default Home