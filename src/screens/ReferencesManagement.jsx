import { useState, useEffect } from 'react'
import {
  semestersAPI,
  facultiesAPI,
  departmentsAPI,
  buildingsAPI,
  classroomsAPI,
  disciplinesAPI,
  timeSlotsAPI,
  programsAPI,
  groupsAPI,
  curriculumAPI
} from '../services/referencesAPI'
import './ReferencesManagement.css'

const ReferencesManagement = () => {
  const [activeTab, setActiveTab] = useState('semesters')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Данные для каждой вкладки
  const [semesters, setSemesters] = useState([])
  const [faculties, setFaculties] = useState([])
  const [departments, setDepartments] = useState([])
  const [buildings, setBuildings] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [programs, setPrograms] = useState([])
  const [groups, setGroups] = useState([])
  const [curriculum, setCurriculum] = useState([])

  // Модальные состояния
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})

  // Вкладки
  const tabs = [
    { id: 'semesters', label: 'Семестры', icon: '📅' },
    { id: 'faculties', label: 'Факультеты', icon: '🏛️' },
    { id: 'departments', label: 'Кафедры', icon: '🏢' },
    { id: 'buildings', label: 'Корпуса', icon: '🏫' },
    { id: 'classrooms', label: 'Аудитории', icon: '🚪' },
    { id: 'disciplines', label: 'Дисциплины', icon: '📚' },
    { id: 'timeSlots', label: 'Расписание звонков', icon: '⏰' },
    { id: 'programs', label: 'Программы', icon: '🎓' },
    { id: 'groups', label: 'Группы', icon: '👥' },
    { id: 'curriculum', label: 'Учебные планы', icon: '📋' }
  ]

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      switch (activeTab) {
        case 'semesters':
          const semData = await semestersAPI.getAll()
          setSemesters(semData.data.data)
          break
        case 'faculties':
          const facData = await facultiesAPI.getAll()
          setFaculties(facData.data.data)
          break
        case 'departments':
          const depData = await departmentsAPI.getAll()
          setDepartments(depData.data.data)
          break
        case 'buildings':
          const bldData = await buildingsAPI.getAll()
          setBuildings(bldData.data.data)
          break
        case 'classrooms':
          const clsData = await classroomsAPI.getAll()
          setClassrooms(clsData.data.data)
          break
        case 'disciplines':
          const discData = await disciplinesAPI.getAll()
          setDisciplines(discData.data.data)
          break
        case 'timeSlots':
          const tsData = await timeSlotsAPI.getAll()
          setTimeSlots(tsData.data.data)
          break
        case 'programs':
          const progData = await programsAPI.getAll()
          setPrograms(progData.data.data)
          break
        case 'groups':
          const grpData = await groupsAPI.getAll()
          setGroups(grpData.data.data)
          break
        case 'curriculum':
          const currData = await curriculumAPI.getAll()
          setCurriculum(currData.data.data)
          break
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Деректерді жүктеу қатесі')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setModalMode('create')
    setSelectedItem(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setModalMode('edit')
    setSelectedItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Өшіруді растайсыз ба?')) return

    try {
      setLoading(true)
      switch (activeTab) {
        case 'semesters':
          await semestersAPI.delete(id)
          break
        case 'faculties':
          await facultiesAPI.delete(id)
          break
        case 'departments':
          await departmentsAPI.delete(id)
          break
        case 'buildings':
          await buildingsAPI.delete(id)
          break
        case 'classrooms':
          await classroomsAPI.delete(id)
          break
        case 'disciplines':
          await disciplinesAPI.delete(id)
          break
        case 'timeSlots':
          await timeSlotsAPI.delete(id)
          break
        case 'programs':
          await programsAPI.delete(id)
          break
        case 'groups':
          await groupsAPI.delete(id)
          break
        case 'curriculum':
          await curriculumAPI.delete(id)
          break
      }
      setSuccess('Сәтті өшірілді!')
      loadData()
    } catch (err) {
      setError(err.response?.data?.message || 'Өшіру қатесі')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data) => {
    try {
      setLoading(true)
      if (modalMode === 'create') {
        switch (activeTab) {
          case 'semesters':
            await semestersAPI.create(data)
            break
          case 'faculties':
            await facultiesAPI.create(data)
            break
          case 'departments':
            await departmentsAPI.create(data)
            break
          case 'buildings':
            await buildingsAPI.create(data)
            break
          case 'classrooms':
            await classroomsAPI.create(data)
            break
          case 'disciplines':
            await disciplinesAPI.create(data)
            break
          case 'timeSlots':
            await timeSlotsAPI.create(data)
            break
          case 'programs':
            await programsAPI.create(data)
            break
          case 'groups':
            await groupsAPI.create(data)
            break
          case 'curriculum':
            await curriculumAPI.create(data)
            break
        }
        setSuccess('Сәтті жасалды!')
      } else {
        switch (activeTab) {
          case 'semesters':
            await semestersAPI.update(selectedItem.id, data)
            break
          case 'faculties':
            await facultiesAPI.update(selectedItem.id, data)
            break
          case 'departments':
            await departmentsAPI.update(selectedItem.id, data)
            break
          case 'buildings':
            await buildingsAPI.update(selectedItem.id, data)
            break
          case 'classrooms':
            await classroomsAPI.update(selectedItem.id, data)
            break
          case 'disciplines':
            await disciplinesAPI.update(selectedItem.id, data)
            break
          case 'timeSlots':
            await timeSlotsAPI.update(selectedItem.id, data)
            break
          case 'programs':
            await programsAPI.update(selectedItem.id, data)
            break
          case 'groups':
            await groupsAPI.update(selectedItem.id, data)
            break
          case 'curriculum':
            await curriculumAPI.update(selectedItem.id, data)
            break
        }
        setSuccess('Сәтті жаңартылды!')
      }
      setShowModal(false)
      loadData()
    } catch (err) {
      setError(err.response?.data?.message || 'Сақтау қатесі')
    } finally {
      setLoading(false)
    }
  }

  const renderTable = () => {
    let data, columns
    
    switch (activeTab) {
      case 'semesters':
        data = semesters
        columns = ['academicYear', 'number', 'startDate', 'endDate', 'isActive']
        break
      case 'faculties':
        data = faculties
        columns = ['code', 'nameKz', 'nameRu', 'isActive']
        break
      case 'departments':
        data = departments
        columns = ['code', 'nameKz', 'nameRu', 'faculty.nameRu', 'isActive']
        break
      case 'buildings':
        data = buildings
        columns = ['code', 'name', 'address', 'floorsCount']
        break
      case 'classrooms':
        data = classrooms
        columns = ['building.name', 'number', 'capacity', 'type', 'isActive']
        break
      case 'disciplines':
        data = disciplines
        columns = ['code', 'nameKz', 'nameRu', 'credits', 'category']
        break
      case 'timeSlots':
        data = timeSlots
        columns = ['shift', 'pairNumber', 'startTime', 'endTime']
        break
      case 'programs':
        data = programs
        columns = ['code', 'nameKz', 'nameRu', 'degreeLevel', 'durationYears', 'isActive']
        break
      case 'groups':
        data = groups
        columns = ['code', 'enrollmentYear', 'courseNumber', 'studentsCount', 'language', 'isActive']
        break
      case 'curriculum':
        data = curriculum
        columns = ['program.nameRu', 'discipline.nameRu', 'semester', 'credits', 'hoursTotal']
        break
      default:
        data = []
        columns = []
    }

    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Жүктелуде...</p>
        </div>
      )
    }

    if (!data || data.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Деректер жоқ</h3>
          <p>Жаңа жазба қосу үшін "Жаңа қосу" батырмасын басыңыз</p>
        </div>
      )
    }

    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
              <th>Әрекеттер</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((col, idx) => (
                  <td key={idx}>
                    {col.includes('.')
                      ? col.split('.').reduce((obj, key) => obj?.[key], item) || '-'
                      : typeof item[col] === 'boolean'
                      ? item[col] ? '✅' : '❌'
                      : item[col] || '-'}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn-delete">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderModalContent = () => {
    return (
      <form onSubmit={handleSubmit} className="modal-form">
        {activeTab === 'semesters' && (
          <>
            <div className="form-group">
              <label>Оқу жылы *</label>
              <input type="text" value={formData.academicYear || ''} onChange={(e) => handleChange('academicYear', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Семестр номері *</label>
              <input type="number" value={formData.number || ''} onChange={(e) => handleChange('number', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Басталу күні *</label>
              <input type="date" value={formData.startDate || ''} onChange={(e) => handleChange('startDate', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Аяқталу күні *</label>
              <input type="date" value={formData.endDate || ''} onChange={(e) => handleChange('endDate', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'faculties' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (қаз) *</label>
              <input type="text" value={formData.nameKz || ''} onChange={(e) => handleChange('nameKz', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (рус) *</label>
              <input type="text" value={formData.nameRu || ''} onChange={(e) => handleChange('nameRu', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'buildings' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы *</label>
              <input type="text" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Мекенжайы</label>
              <input type="text" value={formData.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Қабаттар саны</label>
              <input type="number" value={formData.floorsCount || ''} onChange={(e) => handleChange('floorsCount', parseInt(e.target.value))} />
            </div>
          </>
        )}

        {activeTab === 'departments' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (қаз) *</label>
              <input type="text" value={formData.nameKz || ''} onChange={(e) => handleChange('nameKz', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (рус) *</label>
              <input type="text" value={formData.nameRu || ''} onChange={(e) => handleChange('nameRu', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Факультет ID</label>
              <input type="number" value={formData.facultyId || ''} onChange={(e) => handleChange('facultyId', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'classrooms' && (
          <>
            <div className="form-group">
              <label>Корпус ID *</label>
              <input type="number" value={formData.buildingId || ''} onChange={(e) => handleChange('buildingId', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Номер *</label>
              <input type="text" value={formData.number || ''} onChange={(e) => handleChange('number', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Сыйымдылық</label>
              <input type="number" value={formData.capacity || ''} onChange={(e) => handleChange('capacity', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Түрі</label>
              <input type="text" value={formData.type || ''} onChange={(e) => handleChange('type', e.target.value)} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'disciplines' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (қаз) *</label>
              <input type="text" value={formData.nameKz || ''} onChange={(e) => handleChange('nameKz', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (рус) *</label>
              <input type="text" value={formData.nameRu || ''} onChange={(e) => handleChange('nameRu', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Кредиттер *</label>
              <input type="number" value={formData.credits || ''} onChange={(e) => handleChange('credits', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Категория</label>
              <input type="text" value={formData.category || ''} onChange={(e) => handleChange('category', e.target.value)} />
            </div>
          </>
        )}

        {activeTab === 'timeSlots' && (
          <>
            <div className="form-group">
              <label>Ауысым *</label>
              <select value={formData.shift || ''} onChange={(e) => handleChange('shift', e.target.value)} required>
                <option value="">Таңдаңыз</option>
                <option value="1">1-ші ауысым</option>
                <option value="2">2-ші ауысым</option>
              </select>
            </div>
            <div className="form-group">
              <label>Жұп номері *</label>
              <input type="number" value={formData.pairNumber || ''} onChange={(e) => handleChange('pairNumber', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Басталу уақыты *</label>
              <input type="time" value={formData.startTime || ''} onChange={(e) => handleChange('startTime', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Аяқталу уақыты *</label>
              <input type="time" value={formData.endTime || ''} onChange={(e) => handleChange('endTime', e.target.value)} required />
            </div>
          </>
        )}

        {activeTab === 'programs' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (қаз) *</label>
              <input type="text" value={formData.nameKz || ''} onChange={(e) => handleChange('nameKz', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Атауы (рус) *</label>
              <input type="text" value={formData.nameRu || ''} onChange={(e) => handleChange('nameRu', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Деңгей</label>
              <input type="text" value={formData.degreeLevel || ''} onChange={(e) => handleChange('degreeLevel', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Оқу ұзақтығы (жыл)</label>
              <input type="number" value={formData.durationYears || ''} onChange={(e) => handleChange('durationYears', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'groups' && (
          <>
            <div className="form-group">
              <label>Код *</label>
              <input type="text" value={formData.code || ''} onChange={(e) => handleChange('code', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Қабылдау жылы *</label>
              <input type="number" value={formData.enrollmentYear || ''} onChange={(e) => handleChange('enrollmentYear', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Курс номері</label>
              <input type="number" value={formData.courseNumber || ''} onChange={(e) => handleChange('courseNumber', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Студенттер саны</label>
              <input type="number" value={formData.studentsCount || ''} onChange={(e) => handleChange('studentsCount', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Тіл</label>
              <input type="text" value={formData.language || ''} onChange={(e) => handleChange('language', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Бағдарлама ID</label>
              <input type="number" value={formData.programId || ''} onChange={(e) => handleChange('programId', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" checked={formData.isActive || false} onChange={(e) => handleChange('isActive', e.target.checked)} />
                Белсенді
              </label>
            </div>
          </>
        )}

        {activeTab === 'curriculum' && (
          <>
            <div className="form-group">
              <label>Бағдарлама ID *</label>
              <input type="number" value={formData.programId || ''} onChange={(e) => handleChange('programId', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Пән ID *</label>
              <input type="number" value={formData.disciplineId || ''} onChange={(e) => handleChange('disciplineId', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Семестр *</label>
              <input type="number" value={formData.semester || ''} onChange={(e) => handleChange('semester', parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
              <label>Кредиттер</label>
              <input type="number" value={formData.credits || ''} onChange={(e) => handleChange('credits', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Барлық сағаттар</label>
              <input type="number" value={formData.hoursTotal || ''} onChange={(e) => handleChange('hoursTotal', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Дәріс сағаттары</label>
              <input type="number" value={formData.hoursLecture || ''} onChange={(e) => handleChange('hoursLecture', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Практика сағаттары</label>
              <input type="number" value={formData.hoursPractice || ''} onChange={(e) => handleChange('hoursPractice', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Зертхана сағаттары</label>
              <input type="number" value={formData.hoursLab || ''} onChange={(e) => handleChange('hoursLab', parseInt(e.target.value))} />
            </div>
          </>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
            Болдырмау
          </button>
          <button type="submit" className="btn-primary">
            {modalMode === 'create' ? 'Қосу' : 'Сақтау'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="references-management">
      <div className="header">
        <h1>Анықтамалықтарды басқару</h1>
        <p>Жүйенің негізгі анықтамалықтарын басқару</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
          <button onClick={() => setSuccess(null)}>✕</button>
        </div>
      )}

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="content">
        <div className="content-header">
          <h2>{tabs.find((t) => t.id === activeTab)?.label}</h2>
          <button className="btn-primary" onClick={handleCreate}>
            ➕ Жаңа қосу
          </button>
        </div>

        {renderTable()}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'create' ? 'Жаңа жазба қосу' : 'Жазбаны өңдеу'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReferencesManagement

