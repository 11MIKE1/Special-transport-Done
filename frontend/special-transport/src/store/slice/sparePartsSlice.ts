import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sparePartsAPI } from '../../axios'
import { AxiosError } from 'axios'
import {
	IFullFilter,
	IInfo,
	IOrder,
	IOrderRequest,
	ISparePart,
	ITypename,
} from '../modules'

type SparePartsState = {
	loading: boolean
	error: null | string | undefined
	list: ISparePart[]
	typename: ITypename[]
	info: IInfo[]
}

const initialState: SparePartsState = {
	error: null,
	loading: false,
	list: [],
	typename: [],
	info: [],
}

export const fetchBySpareParts = createAsyncThunk<
	ISparePart[],
	void,
	{ rejectValue: string }
>('spareParts/fetchBySpareParts', async (_, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getSpareParts()
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as ISparePart[]
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

export const fetchByAddNewOrder = createAsyncThunk<
	IOrderRequest,
	IOrder,
	{ rejectValue: string }
>('spareParts/fetchByAddNewOrder', async (orderData) => {
	const res = await sparePartsAPI.addNewOrder(orderData)
	// console.log(res)
	if (res.status !== 201) {
		throw new Error('Server error')
	}
	return res.data as IOrderRequest

})

export const fetchSparePartByName = createAsyncThunk<
	ISparePart[],
	string,
	{ rejectValue: string }
>('spareParts/fetchSparePartByName', async (value, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getSparePartByName(value)
		console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as ISparePart[]
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

export const fetchByFullFilter = createAsyncThunk<
	ISparePart[],
	IFullFilter,
	{ rejectValue: string }
>('spareParts/fetchByFilterInStock', async (value, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getFilterFull(value)
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as ISparePart[]
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

export const fetchByTypeNameSparePart = createAsyncThunk<
	ITypename[],
	void,
	{ rejectValue: string }
>('spareParts/fetchByTypeNameSparePart', async (_, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getTypeNameSparePart()
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as ITypename[]
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

export const fetchByInfo = createAsyncThunk<
	IInfo[],
	void,
	{ rejectValue: string }
>('spareParts/fetchByInfo', async (_, { rejectWithValue }) => {
	try {
		const res = await sparePartsAPI.getInfo()
		// console.log(res)
		if (res.status !== 200) {
			throw new Error('Server error')
		}

		return res.data as IInfo[]
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

const sparePartsSlice = createSlice({
	name: 'spareParts',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchBySpareParts.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchBySpareParts.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchBySpareParts.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchByTypeNameSparePart.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByTypeNameSparePart.fulfilled, (state, action) => {
			state.typename = action.payload
			state.loading = false
		})
		addCase(fetchByTypeNameSparePart.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchByInfo.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByInfo.fulfilled, (state, action) => {
			state.info = action.payload
			state.loading = false
		})
		addCase(fetchByInfo.rejected, (state, action) => {
			state.loading = false
			if (action.payload?.includes('404')) {
				state.error = ' 404 Not found!'
			} else {
				state.error = action.payload
			}
		})
		addCase(fetchByAddNewOrder.pending, state => {
			state.loading = true
		})
		addCase(fetchByAddNewOrder.fulfilled, (state, action) => {
			state.loading = false
		})
		addCase(fetchByAddNewOrder.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Неправльно ввели данные!'
			}
		})
		addCase(fetchSparePartByName.pending, state => {
			state.loading = true
		})
		addCase(fetchSparePartByName.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchSparePartByName.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Неправльно ввели данные!'
			}
		})
		addCase(fetchByFullFilter.pending, state => {
			state.loading = true
		})
		addCase(fetchByFullFilter.fulfilled, (state, action) => {
			state.list = action.payload
			state.loading = false
		})
		addCase(fetchByFullFilter.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Неправльно ввели данные!'
			}
		})
	},
})

export default sparePartsSlice.reducer
