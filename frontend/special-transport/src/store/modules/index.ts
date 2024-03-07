export interface IShippingField {
	name: string
	email: string
	phone: number
	description: string
}

type IObjectKeys = {
	[key: string]: string | null
}

type IImagesSpareData = {
	id: number
	image: string
	spare_part: number
}

export type ITypename = {
	id: number
	title: string
}

export type IInfo = {
	id: number
	mainPageTitle: string
	mainPageDescription: string
	mainPageFormImage: string
	advantagesOne: string
	advantagesTwo: string
	advantagesThree: string
	renovationWorkTitle: string
	renovationWorkDescription: string
	renovationWorkImage: string
	serviceStationTitle: string
	serviceStationDescription: string
	serviceStationImage: string
	shippingTitle: string
	shippingDescription: string
	shippingImage: string
	aboutTitle: string
	aboutDescription: string
	aboutImageOne: string
	aboutImageTwo: string
	aboutBlocOneTitle: string
	aboutBlocTwoTitle: string
	aboutBlocOneDescription: string
	aboutBlocTwoDescription: string
	privacy_policy: string
	termsOfUse: string
}

export type ISparePart = {
	id: string
	title: string
	price: number
	year: number
	description: string
	photo: string
	video: string
	existence: string
	count: number
	characteristic: string
	additional: string
	image_spareparts: IImagesSpareData[]
	video_spareparts: string[]
}

export type IOrder = {
	client_name: string
	description?: string
	email: string
	telegram_login?: string
	whatsapp_number: string
	phone_number?: string
}

export type IOrderRequest = IOrder & {
	created_at: string
	id: number
	order_name: string
}

export type IFullFilter = {
	minPrice: string
	maxPrice: string
	startYear: string
	endYear: string
	existense: string
	title: string[]
}

//===========================

export type InfoFooter = {
	address: string
	city: string
	facebook: string
	instagram: string
	phoneNumber: string
	telegram: string
	whatsApp: string
}

export type MainSliderImg = {
	mainSlider: string
}

type IImagesSpecialDetail = {
	id: number
	image: string
	tech_model: number
}

export type Techmodel = {
	price: string
	id: number
	year: number
	name: string
	description: string
	photo: string
	video: string
	existence: string
	count: number
	characteristic: string
	additional: string
	type_name_title: string
	brand_name: string
	image_techmodels: IImagesSpecialDetail[]
}

export type FiltrType = {
	id: number
	title: string
}

export type TypeName = {
	brands: FiltrType[]
	types: FiltrType[]
}

export type Filters = {
	type: string[]
	brand: string[]
	price_min: string
	price_max: string
	year_min: string
	year_max: string
	existence: string
}

export type Price = {
	minPrice: string
	maxPrice: string
}

export type Year = {
	minYear: string
	maxYear: string
}

export type Existense = {
	inStock: boolean
	outOfStock: boolean
}

export type TechmodelDetail = Techmodel &
	IObjectKeys & {
		description: string
	}
