import {createSlice} from '@reduxjs/toolkit';

const mockData = [
  {name: 'Kuala Lumpur', lat: 3.139, long: 101.6869},
  {name: 'George Town', lat: 5.4141, long: 100.3288},
  {name: 'Johor Bahru', lat: 1.4927, long: 103.7414},
  {name: 'Ipoh', lat: 4.5975, long: 101.0901},
  {name: 'Kuching', lat: 1.5533, long: 110.3593},
  {name: 'Shah Alam', lat: 3.0738, long: 101.5183},
  {name: 'Malacca', lat: 2.1896, long: 102.2501},
  {name: 'Kota Kinabalu', lat: 5.9804, long: 116.0735},
  {name: 'Kuantan', lat: 3.8078, long: 103.326},
  {name: 'Alor Setar', lat: 6.1184, long: 100.3671},
  {name: 'Petaling Jaya', lat: 3.1072, long: 101.6067},
  {name: 'Seremban', lat: 2.7297, long: 101.9381},
  {name: 'Miri', lat: 4.3999, long: 113.9934},
  {name: 'Butterworth', lat: 5.3991, long: 100.3638},
  {name: 'Sibu', lat: 2.2833, long: 111.8333},
  {name: 'Kota Bharu', lat: 6.1254, long: 102.2384},
  {name: 'Tawau', lat: 4.2506, long: 117.8984},
  {name: 'Sandakan', lat: 5.845, long: 118.0578},
  {name: 'Kulim', lat: 5.3648, long: 100.5618},
  {name: 'Batu Pahat', lat: 1.8548, long: 102.9325},
  {name: 'Bintulu', lat: 3.1667, long: 113.0333},
  {name: 'Taiping', lat: 4.8548, long: 100.738},
  {name: 'Sepang', lat: 2.6921, long: 101.7505},
  {name: 'Rawang', lat: 3.318, long: 101.5767},
  {name: 'Muar', lat: 2.0458, long: 102.568},
  {name: 'Lahad Datu', lat: 5.0262, long: 118.3271},
];

const stateSlice = createSlice({
  name: 'states',
  initialState: {
    allStates: mockData,
    filteredStates: [],
    selectedState: '',
  },
  reducers: {
    filterStates: (state, action) => {
      state.filteredStates = state.allStates.filter(({name}) =>
        name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    selectState: (state, action) => {
      state.selectedState = action.payload;
    },
  },
});

export const {filterStates, selectState} = stateSlice.actions;
export default stateSlice.reducer;
