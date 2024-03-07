import { configureStore } from '@reduxjs/toolkit'
import sparePartsSlice from './slice/sparePartsSlice'
import detailSparePartsSlice from './slice/detailSpareParts'
import specialEquipmentSlice from './slice/specialEquipmentSlice'
import specialDetailSlice from './slice/specialDetailSlice'

export const store = configureStore({
	reducer: {
		spareParts: sparePartsSlice,
		details: detailSparePartsSlice,
		special: specialEquipmentSlice,
		specialDetail: specialDetailSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
