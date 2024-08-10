import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTutorials = createAsyncThunk('getAllTutorials', () =>{
  return axios.get("http://localhost:3001/v1/tutorials").then(response =>{
    return response.data
    
  })
});
export const tutorialDeleted = createAsyncThunk('tutorialDeleted', (tutorialid) =>{
  return axios.delete("http://localhost:3001/v1/tutorials/" + tutorialid).then(response =>{
    return response.data
  })
});
export const allTutorialDeleted = createAsyncThunk('allTutorialDeleted', () =>{
  return axios.delete("http://localhost:3001/v1/tutorials/all").then(response =>{
    return response.data
  })
});
export const addTutorial = createAsyncThunk('addTutorial', (tutorial) =>{
  return axios.post("http://localhost:3001/v1/tutorials" , tutorial).then(response =>{
    return response.data
  })
});
export const updateTutorial = createAsyncThunk('updateTutorial', (tutorial) =>{
  return axios.put("http://localhost:3001/v1/tutorials/" , tutorial).then(response =>{
    return response.data
  })
});

const tutorialSlice = createSlice({
  name:'TutorialSlice',
  initialState:{
    isLoading: false,
    data:[],
    error: null,
    selectedTutorial:{},
    isDeleted: false,
    isAllDeleted: false,
    isAdded: false,
    isUpdated: false

  },
  reducers:{
    updateSelectedTutorial:  (state, action) =>{
        state.selectedTutorial = action.payload;
    },
    updateDeletedFlag :(state) =>{
      state.isDeleted = false;
    },
    updateAllDeletedFlag :(state) =>{
      state.isAllDeleted = false;
    },
    updateAddFlag :(state) =>{
      state.isAdded = false;
    },
    updateUpdatedFlag :(state) =>{
      state.isUpdated = false;
    }
  },
  extraReducers: (bulider) =>{
        bulider
              .addCase(getAllTutorials.pending, (state,action) =>{
                state.isLoading = true;
              })
              .addCase(getAllTutorials.fulfilled, (state, action ) =>{
                state.isLoading =false;
                state.data = action.payload.data;
              })
              .addCase(getAllTutorials.rejected, (state, action ) =>{
                state.isLoading = false;
                state.error = action.payload;
              })
              .addCase(tutorialDeleted.pending, (state,action) =>{
                state.isLoading = true;
                
              })
              .addCase(tutorialDeleted.fulfilled, (state, action ) =>{
                state.isLoading =false;
                state.isDeleted = true;
              })
              .addCase(tutorialDeleted.rejected, (state, action ) =>{
                state.isLoading = false;
              })
              .addCase(allTutorialDeleted.pending, (state,action) =>{
                state.isLoading = true; 
              })
              .addCase(allTutorialDeleted.fulfilled, (state, action ) =>{
                state.isLoading =false;
                state.isAllDeleted = true;
              })
              .addCase(allTutorialDeleted.rejected, (state, action ) =>{
                state.isLoading = false;
              })
              .addCase(addTutorial.pending, (state,action) =>{
                state.isLoading = true;
              })
              .addCase(addTutorial.fulfilled, (state, action ) =>{
                state.isLoading =false;
                state.isAdded = true;
              })
              .addCase(addTutorial.rejected, (state, action ) =>{
                state.isLoading = false;
              })
              .addCase(updateTutorial.pending, (state,action) =>{
                state.isLoading = true;
              })
              .addCase(updateTutorial.fulfilled, (state, action ) =>{
                state.isLoading =false;
                state.isUpdated = true;
                state.data = []; 
              })
              .addCase(updateTutorial.rejected, (state, action ) =>{
                state.isLoading = false;
              })
  }
})
export const {updateSelectedTutorial,updateDeletedFlag, updateAllDeletedFlag, updateAddFlag, updateUpdatedFlag} = tutorialSlice.actions;

export default tutorialSlice.reducer;