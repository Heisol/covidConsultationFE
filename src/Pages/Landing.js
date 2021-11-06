import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//package imports
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import "../Css/Landing.css";
import Step1 from "./LandingComponents/Step1";
import Step2 from "./LandingComponents/Step2";
import Step3 from "./LandingComponents/Step3";
import Step4 from "./LandingComponents/Step4";
import Step5 from "./LandingComponents/Step5";
import Step6 from "./LandingComponents/Step6";
import Step7 from "./LandingComponents/Step7";
import Step8 from "./LandingComponents/Step8";
import Step9 from "./LandingComponents/Step9";
import Step10 from "./LandingComponents/Step10";
import Step11 from "./LandingComponents/Step11";
import Step12 from "./LandingComponents/Step12";
import Step13 from "./LandingComponents/Step13";
import Step14 from "./LandingComponents/Step14";

//local imports
const Landing = () => {
  useEffect(() => {
    // fetch user validation
  }, []);

  const [Fetching, setFetching] = useState(false);

  const [Step, setStep] = useState(1);

  const [Fever, setFever] = useState(null);
  const [Cough, setCough] = useState(null);
  const [Tiredness, setTiredness] = useState(null);
  const [TasteSmell, setTasteSmell] = useState(null);
  // common symptoms

  const [SoreThroat, setSoreThroat] = useState(null);
  const [Headache, setHeadache] = useState(null);
  const [AchesPains, setAchesPains] = useState(null);
  const [Diarrhoea, setDiarrhoea] = useState(null);
  const [RashDiscoloration, setRashDiscoloration] = useState(null);
  const [EyeRedness, setEyeRedness] = useState(null);
  // less common symptoms

  const [DifficultyBreathing, setDifficultyBreathing] = useState(null);
  const [SpeechMobilityConfusion, setSpeechMobilityConfusion] = useState(null);
  const [ChestPain, setChestPain] = useState(null);
  // serious symptoms

  const requiredItems = [
    Fever,
    Cough,
    Tiredness,
    TasteSmell,
    SoreThroat,
    Headache,
    AchesPains,
    Diarrhoea,
    RashDiscoloration,
    EyeRedness,
    DifficultyBreathing,
    SpeechMobilityConfusion,
    ChestPain,
  ];
  const requiredItemsNames = [
    "Fever",
    "Cough",
    "Tiredness or Lethary",
    "Loss of Taste or Smell",
    "Sore Throat",
    "Headaches or Migraine",
    "Aches and Pains",
    "Diarrhoea",
    "Skin Rash or Discoloration of fingers and toes",
    "Eye Redness or Irritation",
    "Difficulty Breathing or Shortness of Breath",
    "Loss of Speech or Mobility, or Confusion",
    "Chest Pains",
  ];
  const fetchDiagnosis = async () => {
    setFetching(true)
    let i = 0;
    for (i = 0; i < requiredItems.length; i++) {
      if (requiredItems[i] === null) {
        swal({
          title: "Required question(s) not answered",
          text: `Question no. ${i + 1} (${
            requiredItemsNames[i]
          }) was not answered`,
          icon: "warning",
          dangerMode: true,
        });
        setFetching(true)
        return;
      }
    }
    const formBody = new FormData()
    formBody.append('symptoms', JSON.stringify(requiredItemsNames))
    formBody.append('symptomsVal', JSON.stringify(requiredItems))
    try {
        fetch('https://consultation19-server.herokuapp.com/covid19', {
            method: 'POST',
            body: formBody
        }).then((res)=>{setFetching(false)
            return res.json()})
        .then((resJson, err)=>{
            if (err || resJson.status === 'error'){
                swal({
                    title: 'error',
                    text: err.message || resJson.status.log,
                    icon: 'warning',
                    dangerMode: true
                })
            } else {
                console.log(resJson)
                swal({
                    title: resJson.diagnosis.title,
                    text: resJson.diagnosis.message,
                    icon: 'info',
                    dangerMode: true
                })
            }
            setFetching(false)
        })
    } catch (error) {
        swal({
            title: 'Error',
            text: error.message,
            icon: 'warning',
            dangerMode: true
        })
        setFetching(false)
    }
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <p>Did you experience the following symptoms in the last 7 days?</p>
        </div>
        {/*Render choices here*/}
        <div className="justify-content-center p-3 border-bottom">
          {Step === 1 ? (
            <Step1 setState={(input) => setFever(input)} />
          ) : Step === 2 ? (
            <Step2 setState={(input) => setCough(input)} />
          ) : Step === 3 ? (
            <Step3 setState={(input) => setTiredness(input)} />
          ) : Step === 4 ? (
            <Step4 setState={(input) => setTasteSmell(input)} />
          ) : Step === 5 ? (
            <Step5 setState={(input) => setSoreThroat(input)} />
          ) : Step === 6 ? (
            <Step6 setState={(input) => setHeadache(input)} />
          ) : Step === 7 ? (
            <Step7 setState={(input) => setAchesPains(input)} />
          ) : Step === 8 ? (
            <Step8 setState={(input) => setDiarrhoea(input)} />
          ) : Step === 9 ? (
            <Step9 setState={(input) => setRashDiscoloration(input)} />
          ) : Step === 10 ? (
            <Step10 setState={(input) => setEyeRedness(input)} />
          ) : Step === 11 ? (
            <Step11 setState={(input) => setDifficultyBreathing(input)} />
          ) : Step === 12 ? (
            <Step12 setState={(input) => setSpeechMobilityConfusion(input)} />
          ) : Step === 13 ? (
            <Step13 setState={(input) => setChestPain(input)} />
          ) : Step === 14 ? (
            <Step14
              fetching={Fetching}
              setFetching={(boolInput) => {
                setFetching(boolInput);
              }}
              apiCall={() => {
                fetchDiagnosis();
              }}
            />
          ) : (
            "Error"
          )}
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
        <div className="flex-row">
            <FontAwesomeIcon icon={faCheckCircle} style={{color: Fever===true ? 'red': Fever===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: Cough===true ? 'red': Cough===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: Tiredness===true ? 'red': Tiredness===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: TasteSmell===true ? 'red': TasteSmell ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: SoreThroat===true ? 'red': SoreThroat===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: Headache===true ? 'red': Headache===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: AchesPains===true ? 'red': AchesPains===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: Diarrhoea===true ? 'red': Diarrhoea===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: RashDiscoloration===true ? 'red': RashDiscoloration===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: EyeRedness===true ? 'red': EyeRedness===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: DifficultyBreathing===true ? 'red': DifficultyBreathing===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: SpeechMobilityConfusion===true ? 'red': SpeechMobilityConfusion===false ? 'green': 'black'}} />
            <FontAwesomeIcon icon={faCheckCircle} style={{color: ChestPain===true ? 'red': ChestPain===false ? 'green': 'black'}} />
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
  );
};

export default Landing;
