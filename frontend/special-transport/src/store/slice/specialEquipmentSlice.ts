import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Filters, InfoFooter, MainSliderImg, Techmodel, TypeName, } from "../modules"
import { specialEqAPI } from "../../axios"





type SpecialState = {
	loading: boolean
	error: null | string | undefined
	special: Techmodel[]
	filtr: TypeName | null
	infoFooter: InfoFooter | null
	mainSlider: MainSliderImg | null
}

const initialState: SpecialState = {
	error: null,
	loading: false,
	special: [],
	filtr: null,
	infoFooter: null,
	mainSlider: null
}

export const fetchByImgHome = createAsyncThunk<MainSliderImg, void, { rejectValue: string }>(
	'special,fetchByImgHome',
	async (_, { rejectWithValue }) => {
		const res = await specialEqAPI.getImgHome()
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data[0] as MainSliderImg
	}
)

export const fetchByInfoFooter = createAsyncThunk<InfoFooter, void, { rejectValue: string }>(
	'special,fetchByInfoFooter',
	async (_, { rejectWithValue }) => {
		const res = await specialEqAPI.getInfoFooter()
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data[0] as InfoFooter
	}
)

export const fetchByAllAcordion = createAsyncThunk<Techmodel[], Filters, { rejectValue: string }>(
	'special,fetchByAllAcordion',
	async (filters, { rejectWithValue }) => {
		const res = await specialEqAPI.getAllAcordion(filters)
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data
	}
)

export const fetchByTypeNameTitle = createAsyncThunk<TypeName, void, { rejectValue: string }>(
	'special,fetchByTypeNameTitle',
	async (_, { rejectWithValue }) => {
		const res = await specialEqAPI.getTypeNameTitle()
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data as TypeName
	}
)


export const fetchBySearch = createAsyncThunk<Techmodel[], string, { rejectValue: string }>(
	'special,fetchBySearch',
	async (value, { rejectWithValue }) => {
		const res = await specialEqAPI.getSearchName(value)
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data
	}
)


export const fetchByAllTechmodel = createAsyncThunk<Techmodel[], void, { rejectValue: string }>(
	'special,fetchByAllTechmodel',
	async (_, { rejectWithValue }) => {
		const res = await specialEqAPI.getAlltechmodel()
		// console.log(res);
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data as Techmodel[]
	}
)


const specialEquipmentSlice = createSlice({
	name: 'special',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByAllTechmodel.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByAllTechmodel.fulfilled, (state, action) => {
			state.special = action.payload
			state.loading = false
		})
		addCase(fetchByAllTechmodel.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})

		addCase(fetchBySearch.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchBySearch.fulfilled, (state, action) => {
			state.special = action.payload
			state.loading = false
		})
		addCase(fetchBySearch.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})


		addCase(fetchByTypeNameTitle.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByTypeNameTitle.fulfilled, (state, action) => {
			state.filtr = action.payload
			state.loading = false
		})
		addCase(fetchByTypeNameTitle.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})

		addCase(fetchByAllAcordion.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByAllAcordion.fulfilled, (state, action) => {
			state.special = action.payload
			state.loading = false
		})
		addCase(fetchByAllAcordion.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})

		addCase(fetchByInfoFooter.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByInfoFooter.fulfilled, (state, action) => {
			state.infoFooter = action.payload
			state.loading = false
		})
		addCase(fetchByInfoFooter.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})

		addCase(fetchByImgHome.pending, (state) => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByImgHome.fulfilled, (state, action) => {
			state.mainSlider = action.payload
			state.loading = false
		})
		addCase(fetchByImgHome.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			}
			else {
				state.error = action.payload
			}
		})

	}
})

export default specialEquipmentSlice.reducer