import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReturnTypeData, TypeBaseUserSchema } from "@/app/lib/globalType";


const initialState:ReturnTypeData<TypeBaseUserSchema[] >={
    success:false,
    error:false,
    status:0,
    data:[]
}


const userSlice = createSlice({

    name: "users",
    initialState,
    reducers:{
        setAllUser: (state, action: PayloadAction<TypeBaseUserSchema[]>) =>{
            state.data = action.payload
        }
    }

})

export const { setAllUser } = userSlice.actions;

export const userReducer = userSlice.reducer;