export type Url = string

export type HTML = string
export type PlainText = string
export type CSSClasses = string

export type FieldName = 'education' | 'music' | 'development' | 'all the things'

export interface Field {
	name: FieldName
	blurb?: string
}

export interface Project {
	name: string
	title: string
	route: string
	fields: FieldName[]
	link?: Url
	video?: Url
	image?: Url
	published?: boolean
	page?: { [key: string]: unknown }
}

export interface Db {
	fields: Field[]
	projects: Project[]
}

export interface ProjectCache {
	[key: string]: Project
}

export interface Props {
	props: JsonObject
}

export interface JsonObject {
	[key: string]: JsonValue
}

export type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject
