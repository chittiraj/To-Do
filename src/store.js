import { configureStore } from "@reduxjs/toolkit";
import tutorialsReducer from "./Silces/TutorialsSlice";
export const store = configureStore({
    reducer:{
        tutorials: tutorialsReducer 
    }
 })