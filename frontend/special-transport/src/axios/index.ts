import axios from 'axios'
import { IOrder, IFullFilter, Filters } from '../store/modules'

const instanse = axios.create({
	baseURL: 'http://91.147.92.111:8080/',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const specialEqAPI = {
	getAlltechmodel() {
		return instanse.get('techmodel/')
	},
	getDetailById(id: number) {
		return instanse.get(`techmodel/${id}/`)
	},
	getSearchName(value: string) {
		return instanse.get(`techmodel/?search=${value}`)
	},

	getTypeNameTitle() {
		return instanse.get(`/techAndBrand/`)
	},
	getAllAcordion({ brand, existence, price_max, price_min, type, year_max, year_min }: Filters) {
		return instanse.get(`techmodel/?type_name=${type.join(',')}&brand=${brand.join(',')}&year_gte=${year_min}&year_lte=${year_max}&price__gt=${price_min}&price_lt=${price_max}&existence=${existence}`)
	},
	getInfoFooter() {
		return instanse.get(`Footer/`)
	},
	getImgHome() {
		return instanse.get(`MainSliders/`)
	}
}

export const sparePartsAPI = {
	getSpareParts() {
		return instanse.get('sparepart/')
	},
	getFullSparePart(id: string) {
		return instanse.get(`sparepart/${id}/`)
	},
	addNewOrder(orderData: IOrder) {
		return instanse.post('application/', orderData)
	},
	getSparePartByName(value: string) {
		return instanse.get(`sparepart/?search=${value}`)
	},
	getFilterFull(filter: IFullFilter) {
		return instanse.get(
			`sparepart/?title=${filter.title}&existence=${filter.existense}&price_gt=${filter.minPrice}&price_lt=${filter.maxPrice}&year_gt=${filter.startYear}&year_lt=${filter.endYear}`
		)
	},
	getTypeNameSparePart() {
		return instanse.get(`typename/`)
	},
	getInfo() {
		return instanse.get('Info/')
	},
}
