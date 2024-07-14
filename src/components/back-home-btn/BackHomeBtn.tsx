import { FaAngleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export const BackHomeBtn = () => {

    return (
        <Link to={'/'}>
        <div className="home-btn">
            <FaAngleLeft/>
            <h5>HOME</h5>
        </div>
        </Link>
    )
}