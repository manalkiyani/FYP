import "./Payments.scss"
import Sidebar from "../components/sidebar/Sidebar"

import Datatable from "./Datatable/Datatable"

const Payments = () => {

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">

        <Datatable/>
      </div>
    </div>
  )
}

export default Payments;