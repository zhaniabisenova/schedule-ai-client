import api from './api'

// ============================================
// SEMESTERS API
// ============================================

export const semestersAPI = {
  getAll: () => api.get('/semesters'),
  getActive: () => api.get('/semesters/active'),
  getById: (id) => api.get(`/semesters/${id}`),
  create: (data) => api.post('/semesters', data),
  update: (id, data) => api.put(`/semesters/${id}`, data),
  delete: (id) => api.delete(`/semesters/${id}`)
}

// ============================================
// FACULTIES API
// ============================================

export const facultiesAPI = {
  getAll: () => api.get('/faculties'),
  getById: (id) => api.get(`/faculties/${id}`),
  create: (data) => api.post('/faculties', data),
  update: (id, data) => api.put(`/faculties/${id}`, data),
  delete: (id) => api.delete(`/faculties/${id}`)
}

// ============================================
// DEPARTMENTS API
// ============================================

export const departmentsAPI = {
  getAll: () => api.get('/departments'),
  getByFaculty: (facultyId) => api.get(`/departments/faculty/${facultyId}`),
  getById: (id) => api.get(`/departments/${id}`),
  create: (data) => api.post('/departments', data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  delete: (id) => api.delete(`/departments/${id}`)
}

// ============================================
// BUILDINGS API
// ============================================

export const buildingsAPI = {
  getAll: () => api.get('/buildings'),
  getById: (id) => api.get(`/buildings/${id}`),
  create: (data) => api.post('/buildings', data),
  update: (id, data) => api.put(`/buildings/${id}`, data),
  delete: (id) => api.delete(`/buildings/${id}`)
}

// ============================================
// CLASSROOMS API
// ============================================

export const classroomsAPI = {
  getAll: () => api.get('/classrooms'),
  getByBuilding: (buildingId) => api.get(`/classrooms/building/${buildingId}`),
  getByType: (type) => api.get(`/classrooms/type/${type}`),
  getById: (id) => api.get(`/classrooms/${id}`),
  create: (data) => api.post('/classrooms', data),
  update: (id, data) => api.put(`/classrooms/${id}`, data),
  delete: (id) => api.delete(`/classrooms/${id}`)
}

// ============================================
// DISCIPLINES API
// ============================================

export const disciplinesAPI = {
  getAll: () => api.get('/disciplines'),
  getById: (id) => api.get(`/disciplines/${id}`),
  create: (data) => api.post('/disciplines', data),
  update: (id, data) => api.put(`/disciplines/${id}`, data),
  delete: (id) => api.delete(`/disciplines/${id}`)
}

// ============================================
// TIME SLOTS API
// ============================================

export const timeSlotsAPI = {
  getAll: () => api.get('/timeslots'),
  getByShift: (shift) => api.get(`/timeslots/shift/${shift}`),
  getById: (id) => api.get(`/timeslots/${id}`),
  create: (data) => api.post('/timeslots', data),
  update: (id, data) => api.put(`/timeslots/${id}`, data),
  delete: (id) => api.delete(`/timeslots/${id}`)
}

// ============================================
// PROGRAMS API
// ============================================

export const programsAPI = {
  getAll: () => api.get('/programs'),
  getByDepartment: (departmentId) => api.get(`/programs/department/${departmentId}`),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`)
}

// ============================================
// GROUPS API
// ============================================

export const groupsAPI = {
  getAll: () => api.get('/groups'),
  getByProgram: (programId) => api.get(`/groups/program/${programId}`),
  getById: (id) => api.get(`/groups/${id}`),
  create: (data) => api.post('/groups', data),
  update: (id, data) => api.put(`/groups/${id}`, data),
  delete: (id) => api.delete(`/groups/${id}`)
}

// ============================================
// CURRICULUM API
// ============================================

export const curriculumAPI = {
  getAll: () => api.get('/curriculum'),
  getByProgram: (programId) => api.get(`/curriculum/program/${programId}`),
  getById: (id) => api.get(`/curriculum/${id}`),
  create: (data) => api.post('/curriculum', data),
  update: (id, data) => api.put(`/curriculum/${id}`, data),
  delete: (id) => api.delete(`/curriculum/${id}`)
}

// ============================================
// TEACHING LOADS API
// ============================================

export const teachingLoadsAPI = {
  getAll: () => api.get('/teaching-loads'),
  getBySemester: (semesterId) => api.get(`/teaching-loads/semester/${semesterId}`),
  getByTeacher: (teacherId) => api.get(`/teaching-loads/teacher/${teacherId}`),
  getStats: (teacherId, semesterId) => api.get(`/teaching-loads/stats/${teacherId}/${semesterId}`),
  getById: (id) => api.get(`/teaching-loads/${id}`),
  create: (data) => api.post('/teaching-loads', data),
  update: (id, data) => api.put(`/teaching-loads/${id}`, data),
  delete: (id) => api.delete(`/teaching-loads/${id}`)
}

// ============================================
// PENALTIES API
// ============================================

export const penaltiesAPI = {
  getAll: () => api.get('/penalties'),
  getBySemester: (semesterId) => api.get(`/penalties/semester/${semesterId}`),
  getById: (id) => api.get(`/penalties/${id}`),
  create: (data) => api.post('/penalties', data),
  update: (id, data) => api.put(`/penalties/${id}`, data),
  delete: (id) => api.delete(`/penalties/${id}`)
}

// ============================================
// CONSTRAINTS API
// ============================================

export const constraintsAPI = {
  getAll: () => api.get('/constraints'),
  getBySemester: (semesterId) => api.get(`/constraints/semester/${semesterId}`),
  getByEntity: (entityType, entityId) => api.get(`/constraints/entity/${entityType}/${entityId}`),
  getById: (id) => api.get(`/constraints/${id}`),
  create: (data) => api.post('/constraints', data),
  update: (id, data) => api.put(`/constraints/${id}`, data),
  delete: (id) => api.delete(`/constraints/${id}`)
}

// ============================================
// IMPORT API
// ============================================

export const importAPI = {
  uploadTeacherLoad: (formData) => {
    // FormData автоматически определится в api.post
    return api.post('/import/teacher-load', formData)
  },
  validateFile: (formData) => {
    // FormData автоматически определится в api.post
    return api.post('/import/validate', formData)
  },
  getTemplate: () => {
    return api.get('/import/template', {
      responseType: 'blob'
    })
  }
}

