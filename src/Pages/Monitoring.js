import React, { useEffect, useState } from 'react'
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//package imports
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Monitoring = () => {

    const id = window.location.pathname.split('/')[2]
    const [logs, setLogs] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        try {
            fetch(`https://consultation19-server.herokuapp.com/user/${id}`)
                // const fetchLogs = fetch(`http://localhost:8000/user/${id}`)
                .then(res => res.json())
                .then(resJson => {
                    setLogs(resJson)
                    setFetching(false)
                })
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Close'
            })
            setFetching(false)
        }
    }, [setLogs, setFetching, id])

    return (
        <div>
            {fetching
                && <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '100vh',
                }}>
                    <Dots speed={0.5} size={30} />
                </div>
            }
            {logs
                &&
                <div style={{ padding: 10 }}>

                    <div className="p-3 m-3" style={{ borderRadius: 20, border: '1px solid black' }}>
                        <h5 className="card-title">Note</h5>
                        <p className="card-text">Symptoms 1-4 are the most common symptoms.</p>
                        <p className="card-text">Symptoms 5-10 are the less common symptoms.</p>
                        <p className="card-text">Symptoms 11-13 are serious symptoms. It is advised to seeks immediate medical care upon experiencing one.</p>
                        <p className='card-text'>Source <a rel="noreferrer" href="https://www.who.int/health-topics/coronavirus#tab=tab_3" target='_blank' className='btn btn-info'>WHO</a></p>
                    </div>
                    <div className="p-3 m-3">
                        <div className='card-title'>ID: {logs.history[0].id}</div>
                        <table className="table table-hover table-striped">
                            <tbody>
                                <tr>
                                    <th>Date&amp;Time</th>
                                    {logs.history[0].status.symptoms.map(e => {
                                        let index = logs.history[0].status.symptoms.indexOf(e)
                                        return (
                                            <th key={uuidv4()} style={{ maxWidth: '8vw', padding: 10, backgroundColor: index > 9 ? '#444242' : (index > 4 && index < 10) && '#A0A0A0', color: index > 9 && 'white' }}>{e}</th>
                                        )
                                    })}
                                </tr>
                                {logs.history.map(e => {
                                    let d = e.dateTime.split('T')
                                    let date = d[0]
                                    let time = d[1].split('.')[0]
                                    return (
                                        <tr key={uuidv4()}>
                                            <td>{date}|{time}</td>
                                            {logs.history[0].status.symptomsVal.map(e => {
                                                return (
                                                    <td style={{ padding: 10, textAlign: 'center', verticalAlign: 'center' }} key={uuidv4()}>
                                                        {e === true && <FontAwesomeIcon icon={faExclamationCircle} />}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Monitoring