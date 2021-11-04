import swal from "sweetalert";

const Step14 = ({Fetching, setFetching, apiCall}) => {

    const fetchOnclick = async () =>{
        setFetching(true)
        apiCall()
        setFetching(false)
    };

    return (
        <div>
            <button
                type="button"
                className='btn btn-primary'
                disabled={Fetching}
                onClick={()=>fetchOnclick()}
            >Diagnose</button>
        </div>
    )
}

export default Step14
