// instructorSlice.ts
import { getAllInstructors } from '@/app/actions/instructors';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchInstructors = createAsyncThunk(
  'instructors/fetchAll',
async () => {
             try {
               const instructors = await getAllInstructors();
                return instructors;
             } catch (error) {
               console.error('Failed to fetch instructors:', error);
             }
           }
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState: {
    data: [],
    loading: false,
    error:  null
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstructors.fulfilled, (state:any, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchInstructors.rejected, (state:any, action) => {
        state.error = action?.error?.message;
        state.loading = false;
      });
  }
});

export default instructorSlice.reducer;