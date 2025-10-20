import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

// 🔹 CRUD
export const fetchCapacities = () => API.get("/capacities").then(res => res.data);
export const createCapacity = (payload) => API.post("/capacities", payload).then(res => res.data);
export const updateCapacity = (id, payload) => API.put(`/capacities/${id}`, payload).then(res => res.data);
export const deleteCapacity = (id) => API.delete(`/capacities/${id}`);

// 🔹 Analytics
export const fetchCapacityReport = () =>
  API.get("/capacities", { params: { report: 1 } }).then(res => res.data);


// ==================== Regions ====================
export const fetchRegions = async () => (await API.get("/regions")).data;
export const createRegion = (data) => API.post("/regions", data);
export const updateRegion = (id, data) => API.put(`/regions/${id}`, data);
export const deleteRegion = (id) => API.delete(`/regions/${id}`);

// ==================== Districts ====================
export const fetchDistricts = async () => (await API.get("/districts")).data;
export const createDistrict = (data) => API.post("/districts", data);
export const updateDistrict = (id, data) => API.put(`/districts/${id}`, data);
export const deleteDistrict = (id) => API.delete(`/districts/${id}`);

// ==================== Agencies ====================
export const fetchAgencies = async () => (await API.get("/agencies")).data;
export const createAgency = (data) => API.post("/agencies", data);
export const updateAgency = (id, data) => API.put(`/agencies/${id}`, data);
export const deleteAgency = (id) => API.delete(`/agencies/${id}`);

// ==================== Periods ====================
export const fetchPeriods = async () => (await API.get("/periods")).data;
export const createPeriod = (data) => API.post("/periods", data);
export const updatePeriod = (id, data) => API.put(`/periods/${id}`, data);
export const deletePeriod = (id) => API.delete(`/periods/${id}`);

// ==================== Warehouses ====================
export const fetchWarehouses = async () => (await API.get("/warehouses")).data;
export const createWarehouse = async (data) =>
  (await API.post("/warehouses", data)).data;

export const updateWarehouse = async (id, data) =>
  (await API.put(`/warehouses/${id}`, data)).data;

export const deleteWarehouse = async (id) =>
  (await API.delete(`/warehouses/${id}`)).data;

