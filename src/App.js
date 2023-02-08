import Main from "./Main";
import Write from "./blogWebsite/WritePage/Write";
import Navbar from "./blogWebsite/components/Navbar/Navbar";
import BlogsPage from "./blogWebsite/BlogsPage/BlogsPage";

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
  
      { user && <Navbar/>}
      <Routes>
       
       { user && 
      ( <> <Route path="/template/blog/" element={<Main/>} />
         <Route path="/template/blog/write" element={<Write/>} />
         <Route path="/template/blog/blogs" element={<BlogsPage/>} />
         </>)
         }
      </Routes>
    </BrowserRouter>
    

  )
}

export default App