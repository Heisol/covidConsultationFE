import React from 'react'

const Step = ({setState}) => {
    return (
        <div className=''>
            <div><p>Fever</p></div>
            <div>
                <div className="btn-group" role="group">
                    <button type="button" onClick={()=>{setState(false)}} className="btn btn-success">No</button>
                    <button type="button" onClick={()=>{setState(true)}} className="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Step
