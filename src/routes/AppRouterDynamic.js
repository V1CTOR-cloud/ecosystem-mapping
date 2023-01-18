import React,{lazy} from "react";
import { Routes, Route,  } from 'react-router-dom';

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
//import AppliedRoute from "./AppliedRoute";


// Pages
const Home = lazy(() => import("../pages/LandingPage"));

const Dashboard = lazy(() => import("../pages/Dashboard"));

const Canvas = lazy(() => import("../pages/MapCanvasPage"));

const Auth = lazy(() => import("../pages/authentication/Auth"));
const PageNotFound = lazy(() => import("../pages/404"));

//<Route path="/" element={<AppliedRoute><Home /></AppliedRoute>} exact />
export default () => (
   
      <Routes>
        <Route path="/login" element={<UnauthenticatedRoute><Auth /></UnauthenticatedRoute>} exact />
       <Route path="/" element={<UnauthenticatedRoute><Home /></UnauthenticatedRoute>} exact />
       <Route
            path="/"
            element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>}
            exact
          />
       <Route
            path="/dashboard"
            element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>}
            exact
          />
         <Route
            path="/dashboard/:mapId"
            element={<AuthenticatedRoute><Canvas /></AuthenticatedRoute>}
            exact
          />  
       
       <Route path="*" element={<PageNotFound />} />
       </Routes>
    
);


      /*
      <AuthenticatedRoute path="/upload" exact>
        <UploadApp />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/new-app" exact>
        <NewApp />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/admin" exact>
        <Admin />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/sandbox" exact>
        <Sandbox />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/test" exact>
        <Landing />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/home" exact>
        <Home />
      </AuthenticatedRoute>
      <AppliedRoute path="/" exact>
        <Home />
      </AppliedRoute>
      <AuthenticatedRoute path="/register" exact>
        <Register />
      </AuthenticatedRoute>

      <UnauthenticatedRoute path="/login" exact>
        <Login />
      </UnauthenticatedRoute>
      

      <AuthenticatedRoute path="/remote" exact>
        <RemoteTest />
      </AuthenticatedRoute>
      
      <UnauthenticatedRoute path="/" exact>
        <Landing />
      </UnauthenticatedRoute>
      

      <UnauthenticatedRoute path="/register" exact>
        <Landing />
      </UnauthenticatedRoute> 
       <AuthenticatedRoute path="/logout" exact>
        <Logout />
        <Route path="/" element={<Home />} exact />
      </AuthenticatedRoute> 
    
    */