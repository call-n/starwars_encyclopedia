import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const get = async (endpoint) => {
    const response = await axios.get(endpoint)
    return response.data
}

export const getAll = async (kind, page = 1) => {
    return get(`/${kind}/?page=${page}`)
}

export const specifics = async (kind, id) => {
    return get(`/${kind}/${id}`)
}

export const search = async (query, page = 1) => {
    return get(`/people/?search=${query}&page=${page}`)
}

export const getIdFromUrl = (url) => {
	// eslint-disable-next-line no-unused-vars
	const [_endpoint, id] = url
		.replace('https://swapi.dev/api/', '')
		.slice(0, -1)
		.split('/')

	return id
}