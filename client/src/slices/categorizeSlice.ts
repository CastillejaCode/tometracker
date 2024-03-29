import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Filter, Order, Sort } from "../types";

interface Initial {
  sort: Sort;
  filter: Filter;
  order: Order;
}

const initialState: Initial = {
  sort: "Title",
  filter: "All",
  order: true,
};

export const categorizeSliceSlice = createSlice({
  name: "categorize",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
  },
});

export const { setSort, setFilter, setOrder } = categorizeSliceSlice.actions;
export default categorizeSliceSlice.reducer;
