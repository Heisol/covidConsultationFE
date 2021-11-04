const Step14 = ({Fetching, setFetching, apiCall}) => {
    return (
        <div>
            <button
                type="button"
                className='btn btn-primary'
                disabled={Fetching}
                onClick={()=>apiCall()}
            >Diagnose</button>
        </div>
    )
}

export default Step14
