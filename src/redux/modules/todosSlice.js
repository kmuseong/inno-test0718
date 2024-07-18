import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk('__addToDo', async (payload, thunkAPI) => {
    try {
        console.log(payload);
        await waitTwoSeconds();
        return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const __deleteTodo = createAsyncThunk('__deleteToDo', async (payload, thunkAPI) => {
    try {
        await waitTwoSeconds();
        return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const initialState = {
    list: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__addToDo.fulfilled, (state, action) => {
            return {
                ...state,
                list: [...state.list, action.payload],
            };
        });

        builder.addCase(__deleteTodo.fulfilled, (state, action) => {
            return {
                ...state,
                list: state.list.filter((todo) => todo.id !== action.payload),
            };
        });
    },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
