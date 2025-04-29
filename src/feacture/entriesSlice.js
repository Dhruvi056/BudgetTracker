import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // 
//  Create  Action
export const createTask = createAsyncThunk(
  "entries/createTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://680e1bddc47cb8074d92206b.mockapi.io/crud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 201) {
        toast.success("User created successfully!");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// read action 
export const showTask = createAsyncThunk(
  "showTask",
  async (rejectWithValue) => {
    const response = await fetch("https://680e1bddc47cb8074d92206b.mockapi.io/crud");
    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

// delete  action 
export const deleteTask = createAsyncThunk(
  "deleteTask",

  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://680e1bddc47cb8074d92206b.mockapi.io/crud/${id}`, { method: "DELETE" });
    try {
      if (response.status === 200) {
        toast.success(" Delete succesfully")
      }
      console.log(response, "response");
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });


// update action
export const updateTask = createAsyncThunk(
  "updateTask",
  async (data, { rejectWithValue }) => {
    console.log("updateTask", data);
    try {
      const response = await fetch(
        `https://680e1bddc47cb8074d92206b.mockapi.io/crud/${data.id}`, // Use the specific task ID
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        toast.success("User updated successfully");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(showTask.pending, (state) => {
        state.loading = true;

      })
      .addCase(showTask.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    //delete
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;

      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id)
        }
        console.log("delete Action", action.payload)
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    //edit

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;

      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        )
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default entriesSlice.reducer;
