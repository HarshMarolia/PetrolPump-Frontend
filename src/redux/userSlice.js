import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name : "user",
    initialState : {
        name: '' ,
        phoneNumber:'',
        role:'',
        city:'',
        state:'',
        subscription:'',
        blacklisted:''

    },
    reducers : {
      setName(state,action){
        state.name = action.payload;
      },
      setRole(state,action) {  
        state.role = action.payload;
      },
      setPhoneNumber(state,action) {
        state.phoneNumber = action.payload;
      },
      setCity(state,action) {
        state.city = action.payload;
      },
      setState(state,action) {
        state.state = action.payload;
      },
      setSubscription(state,action) {
        state.subscription = action.payload;
      }, 
      setBlacklisted(state,action) {
        state.blacklisted = action.payload;
      } 
    }
}
)


export const {setName , setPhoneNumber , setCity , setState , setRole , setSubscription , setBlacklisted } = userSlice.actions ;

export default userSlice.reducer ;