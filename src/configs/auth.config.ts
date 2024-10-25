import { API_URL } from './api.config'

export const validateTokenUrl = `${API_URL}/?rest_route=/auth/v1/auth/validate`
export const refreshTokenUrl = `${API_URL}/?rest_route=/auth/v1/auth/refresh`
export const loginUrl = `${API_URL}/?rest_route=/auth/v1/auth`
