import axiosInstance from "./axiosInstance"

// Base URL for homepage
const BASE = "/api/v1/homepage/homepage/"

// ── GET all homepage data ────────────────────────────
// Returns an array → we take first item [0]
export const getHomepageData = async () => {
  const response = await axiosInstance.get(BASE)
  // API returns array, we need first item
  return response.data[0]
}

// ── GET homepage by ID ───────────────────────────────
export const getHomepageById = async (id) => {
  const response = await axiosInstance.get(`${BASE}${id}/`)
  return response.data
}

// ── CREATE homepage data (first time only) ───────────
export const createHomepageData = async (data) => {
  const response = await axiosInstance.post(BASE, data)
  return response.data
}

// ── UPDATE homepage data (full update) ──────────────
export const updateHomepageData = async (id, data) => {
  const response = await axiosInstance.put(`${BASE}${id}/`, data)
  return response.data
}

// ── PARTIAL UPDATE (only changed fields) ────────────
export const patchHomepageData = async (id, data) => {
  const response = await axiosInstance.patch(`${BASE}${id}/`, data)
  return response.data
}

// ── DELETE homepage data ─────────────────────────────
export const deleteHomepageData = async (id) => {
  const response = await axiosInstance.delete(`${BASE}${id}/`)
  return response.data
}