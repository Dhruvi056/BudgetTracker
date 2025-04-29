import {configureStore} from "@reduxjs/toolkit";
import  entriesSlice  from "../feacture/entriesSlice";

const store = configureStore({
    reducer:{
      app:entriesSlice
    },
})
export default store;  

//app is key app ni helpe thi je entriesslice ma je state banaviyo tena data app ni help thi excess kari sakiye