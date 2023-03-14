import "./Messages.scss"
import Sidebar from "../../Admin/components/sidebar/Sidebar"

import Datatable from "./Datatable/Datatable"

const Messages = () => {

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">

        <Datatable/>
      </div>
    </div>
  )
}

export default Messages;