import React from 'react'

const Step1 = ({setState}) => {
    return (
        <div className='row'>
            <div><p>Fever</p></div>
            <div className="row">
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" onClick={()=>{setState(false)}} className="btn btn-success">No</button>
                    <button type="button" onClick={()=>{setState(true)}} className="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Step1
