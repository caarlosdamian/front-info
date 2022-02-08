import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    incidents: null,
    uncommunicated_stores: null,
    perc_stores_without_incidents: null,
    table: [
      {
        ID: "-",
        Ciudad: "-",
        Tipologia: "-",
        Comunicacion: "-",
        Pasarela_Clima: "-",
        Alumbrado: "-",
        Clima: "-",
        Banderola: "-",
        Rotulo: "-",
        Consumo_Clima: "-",
        Confort: "-",
      },
    ],
  },
  total_locations: null,
  location_tags: [{ id: 0, label: "Propa" }, { id: 1, label: "Pass2" }, { id: 2, label: "Prs3" },
  { id: 0, label: "Prss" }, { id: 1, label: "Prs2" }, { id: 2, label: "Pss3" }, { id: 2, label: "Pss3" }],

  dropdown_tagss: false
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    SET_TABLE: (state, action) => {
      state.data = action.payload;
    },
    SET_LOCATIONS: (state, action) => {
      state.total_locations = action.payload;
    },
    SET_TAGS: (state, action) => {
      state.location_tags = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_TABLE, SET_LOCATIONS, SET_TAGS } = tableSlice.actions;

export default tableSlice.reducer;
