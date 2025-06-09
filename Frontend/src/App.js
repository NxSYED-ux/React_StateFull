import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UserHome from "./Components/UserHome";

import { BrowserRouter,Route,Routes } from "react-router-dom";


function App() {
  return (
     <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/userhome" element={<UserHome />}></Route>
     </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;

