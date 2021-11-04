import '../Css/NotFound.css'
import { Link } from 'react-router-dom'
import errorIcon from '../Assets/404Icon.png'

const NotFound = () => {
    return (
        <div className='container' >
            <img className='icon' src={errorIcon} alt="404 error" />
            <h1>404 error</h1>
            <p>Page not Found</p>
            <Link className='btn btn-primary' to="/">Go to Homepage</Link>
        </div>
    )
}

export default NotFound
