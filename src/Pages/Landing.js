import React, { useState} from "react";
import Swal from 'sweetalert2'
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//package imports
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Landing = () => {

    const [Step, setStep] = useState(1)
    const [SymptomBool,setSymptomBool] = useState([
        {state: null, name:"Fever", id: 1},
        {state: null, name:"Cough", id: 2},
        {state: null, name:"Tiredness or Lethargy", id: 3},
        {state: null, name:"Loss of Taste or Smell", id: 4},
        {state: null, name:"Sore Throat", id: 5},
        {state: null, name:"Headaches or Migraine", id: 6},
        {state: null, name:"Aches and Pains", id: 7},
        {state: null, name:"Diarrhoea", id: 8},
        {state: null, name:"Skin Rash or Discoloration of fingers and toes", id: 9},
        {state: null, name:"Eye Redness or Irritation", id: 10},
        {state: null, name:"Difficulty Breathing or Shortness of Breath", id: 11},
        {state: null, name:"Loss of Speech or Mobility, or Confusion", id: 12},
        {state: null, name:"Chest Pains", id: 13},
    ])

    const updateArrState = async (id, state) =>{
        let extractItemWithId = SymptomBool.filter((item)=>{
            if (item.id !== id) return item
        })
        let newItem = SymptomBool[id-1]
        newItem.state = state;
        let newArr = [...extractItemWithId, newItem]
        const finalArr = newArr.sort((a, b) => a.id<b.id? -1 : a.id>b.id? 1 : 0) 
        setSymptomBool(finalArr)
    }

    const [Fetching, setFetching] = useState(false)
    const fetchApi = async () => {
        setFetching(true)
        var i = 0
        for (i = 0; i < SymptomBool.length; i++){
            if (SymptomBool[i].state == null) {
                Swal.fire({
                    title: 'Required question(s) unanswered',
                    text: `Question no.${i+1} not answered`,
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
                setStep(i+1)
                setFetching(false)
                return
            }
        }
        // fetch api
        const formBody = new FormData()
        const symptoms = SymptomBool.map((item)=>{return item.name})
        const symptomsVal = SymptomBool.map((item)=>{return item.state})
        formBody.append('symptoms', JSON.stringify(await symptoms))
        formBody.append('symptomsVal', JSON.stringify(await symptomsVal))
        try {
            fetch('https://consultation19-server.herokuapp.com/covid19', {
                method: 'POST',
                body: formBody
            }).then((res,err)=>{setFetching(false)
                if (err) {
                    Swal.fire({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                }
                return res.json()})
            .then((resJson, err)=>{
                if (err || resJson.status === 'error'){
                    Swal.fire({
                        title: 'Error',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                } else {
                    Swal.fire({
                        title: resJson.diagnosis.title,
                        html: `${resJson.diagnosis.message}<br>
                        Click the link below for see<br>
                        <a
                          href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
                          target="_blank"
                        >
                        WHO covid19 guidelines and precautions
                        </a>
                        `,
                        confirmButtonText: 'Close'
                    })
                }
                setFetching(false)
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            setFetching(false)
        }
    }


  return <div className="container">
      <div className="col">
        <div className="row">
          <p>Did you experience the following symptoms in the last 7 days?</p>
        </div>
        {/*Render choices here*/}
        <div className="justify-content-center p-3 border-bottom">
          {SymptomBool.map((item)=>{
              return Step===item.id && <div className='row' key={item.id}>
                <div><p>{item.name}</p></div>
                <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={()=>{updateArrState(item.id, false)}} className="btn btn-success">No</button>
                        <button type="button" onClick={()=>{updateArrState(item.id, true)}} className="btn btn-danger">Yes</button>
                    </div>
                </div>
            </div>
          })}
          {Step === 14 && <div>
            <button
                type="button"
                className='btn btn-primary'
                disabled={Fetching}
                onClick={()=>fetchApi()}
            >Diagnose</button>
        </div>}
        </div>
        <div className="row p-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              onClick={() => {
                if (Step > 1) setStep(Step - 1);
              }}
              disabled={Step < 2 || Fetching === true}
              className="btn btn-dark"
            >
              Previous Item
            </button>
            <button
              type="button"
              onClick={() => {
                if (Step < 15) setStep(Step + 1);
              }}
              disabled={Step > 13 || Fetching === true}
              className="btn btn-info"
            >
              Next Item
            </button>
          </div>
          {Fetching === true && <Dots />}
        </div>
      </div>
      <div className="fixed-bottom font-small footerContainer text-center">
        <p>Question no. {Step}</p>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {SymptomBool.map((item)=>{
                return <div key={item.id} style={{padding: 3}} >
                    <FontAwesomeIcon icon={faCheckCircle} style={{color: item.state===true ? 'red': item.state===false ? 'green': 'black', border: Step===item.id? '2px solid black': ''}} />
                </div>
            })}
        </div>
        <p>
          Symptoms listed are from{" "}
          <a
            href="https://www.who.int/health-topics/coronavirus#tab=tab_3"
            target="_blank"
            rel="noreferrer"
          >
            World Health Organization
          </a>{" "}
        </p>
      </div>
    </div>
};

export default Landing;
