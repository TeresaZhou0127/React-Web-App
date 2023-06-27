import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./Login";
import Register from "./Register";
import ModelSelection from "./ModelSelection";
import CreateModelFlow from './CreateModelFlow';
import GenerateImageFlow from './GenerateImageFlow';
import GenerateTextFlow from './GenerateTextFlow';
import UpdateModelFlow from './UpdateModelFlow';
import GetImages from './GetImages';
import GetTexts from './GetTexts';
import GetTrainingMethod from './GetTrainingMethod';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://generative-paw.mightypaw.info/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />}/>
        <Route path="ModelSelection" element={<ModelSelection />} />
        <Route path="CreateModelFlow" element={<CreateModelFlow />} />
        <Route path="GenerateImageFlow" element={<GenerateImageFlow />}/>
        <Route path="GenerateTextFlow" element={<GenerateTextFlow />}/>
        <Route path="UpdateModelFlow" element={<UpdateModelFlow />}/>
        <Route path="GetImages" element={<GetImages />}/>
        <Route path="GetTexts" element={<GetTexts />}/>
        <Route path="GetTrainingMethod" element={<GetTrainingMethod />}/> 
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();