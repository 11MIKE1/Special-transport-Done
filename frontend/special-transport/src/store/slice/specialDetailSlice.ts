import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TechmodelDetail } from '../modules'
import { specialEqAPI } from '../../axios'

type SpecialDetailState = {
	loading: boolean
	error: null | string | undefined
	specialDetail: TechmodelDetail | null
}

const initialState: SpecialDetailState = {
	error: null,
	loading: false,
	specialDetail: null,
}

export const fetchByDetailTechmodel = createAsyncThunk<
	TechmodelDetail,
	number,
	{ rejectValue: string }
>('specialDetail,fetchByDetailTechmodel', async (id, { rejectWithValue }) => {
	const res = await specialEqAPI.getDetailById(id)
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server error')
	}
	return res.data as TechmodelDetail
})

const specialDetailSlice = createSlice({
	name: 'specialDetail',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByDetailTechmodel.pending, state => {
			state.error = null
			state.loading = true
		})
		addCase(fetchByDetailTechmodel.fulfilled, (state, action) => {
			state.specialDetail = action.payload
			state.loading = false
		})
		addCase(fetchByDetailTechmodel.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = '404 not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default specialDetailSlice.reducer
