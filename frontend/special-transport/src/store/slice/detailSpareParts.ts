import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ISparePart } from '../modules'
import { AxiosError } from 'axios'
import { sparePartsAPI } from '../../axios'

type DetailState = {
	detail: null | ISparePart
	loading: boolean
	error: null | string | undefined
}

const initialState: DetailState = {
	detail: null,
	error: null,
	loading: false,
}

export const fetchByDetailSparePart = createAsyncThunk<
	ISparePart,
	string,
	{ rejectValue: string }
>('details/fetchByDetailSparePart', async (id, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getFullSparePart(id)
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as ISparePart
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return rejectWithValue(message)
		}
		// unhandled non-AxiosError goes here
		throw error
	}
})

export const detailSparePartsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByDetailSparePart.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByDetailSparePart.fulfilled, (state, action) => {
			state.detail = action.payload
			state.loading = false
		})
		addCase(fetchByDetailSparePart.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
	},
})

export default detailSparePartsSlice.reducer
