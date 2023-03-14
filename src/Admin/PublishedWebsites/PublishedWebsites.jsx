import "./PublishedWebsites.scss"
import Sidebar from "../../Admin/components/sidebar/Sidebar"

import Datatable from "./Datatable/Datatable"

const PublishedWebsites = () => {



  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">

        <Datatable/>
      </div>
    </div>
  )
}

export default PublishedWebsites;