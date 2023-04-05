import { Link } from "react-router-dom";
const DoctorsPage = ()=>{
    return(
        <div>
            <Link to="/adddoctor">
            <button >add doctor</button>
            </Link>

        </div>
    )

}
export default DoctorsPage;