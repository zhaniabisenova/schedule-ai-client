import { useState, useEffect } from 'react'
import { importAPI, semestersAPI } from '../services/referencesAPI'
import { useUsers } from '../hooks/useUsers'
import './ExcelImport.css'

const ExcelImport = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [teacherId, setTeacherId] = useState('')
  const [semesterId, setSemesterId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [importResult, setImportResult] = useState(null)

  const [teachers, setTeachers] = useState([])
  const [semesters, setSemesters] = useState([])

  const { users } = useUsers()

  useEffect(() => {
    // Загружаем семестры
    loadSemesters()
  }, [])

  useEffect(() => {
    // Фильтруем преподавателей из users
    if (users) {
      const teacherList = users.filter(u => u.role === 'teacher')
      setTeachers(teacherList)
    }
  }, [users])

  const loadSemesters = async () => {
    try {
      const response = await semestersAPI.getAll()
      setSemesters(response.data.data)
      
      // Устанавливаем активный семестр по умолчанию
      const activeSemester = response.data.data.find(s => s.isActive)
      if (activeSemester) {
        setSemesterId(activeSemester.id.toString())
      }
    } catch (err) {
      console.error('Error loading semesters:', err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Проверяем расширение файла
      const ext = file.name.split('.').pop().toLowerCase()
      if (!['xls', 'xlsx'].includes(ext)) {
        setError('Тек Excel файлдары рұқсат етілген (.xls, .xlsx)')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleValidate = async () => {
    if (!selectedFile) {
      setError('Файлды таңдаңыз')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      setLoading(true)
      const response = await importAPI.validateFile(formData)
      setSuccess('Файл форматы дұрыс! Импортқа дайын.')
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Файлды тексеру қатесі')
      setSuccess(null)
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Файлды таңдаңыз')
      return
    }

    if (!teacherId) {
      setError('Оқытушыны таңдаңыз')
      return
    }

    if (!semesterId) {
      setError('Семестрді таңдаңыз')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('teacherId', teacherId)
    formData.append('semesterId', semesterId)

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      setImportResult(null)

      const response = await importAPI.uploadTeacherLoad(formData)
      setSuccess(response.data.message)
      setImportResult(response.data.data)
      
      // Очищаем форму
      setSelectedFile(null)
      document.getElementById('file-input').value = ''
      
    } catch (err) {
      setError(err.response?.data?.message || 'Импорт қатесі')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      setLoading(true)
      const response = await importAPI.getTemplate()
      
      // Создаем blob URL и скачиваем
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'teacher_load_template.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      
      setSuccess('Үлгі файл жүктелді!')
    } catch (err) {
      setError('Үлгі файлды жүктеу қатесі')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="excel-import">
      <div className="header">
        <h1>📊 Excel файлдан импорт</h1>
        <p>Оқытушының жеке жүктемесін Excel файлынан жүктеу</p>
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

      <div className="import-card">
        <div className="instructions">
          <h3>📝 Нұсқаулық</h3>
          <ol>
            <li>Алдымен барлық анықтамалықтарды (факультеттер, кафедралар, пәндер, топтар) толтырыңыз</li>
            <li>Оқытушыны және семестрді таңдаңыз</li>
            <li>Excel файлын таңдаңыз (үлгі файлды жүктеп алуға болады)</li>
            <li>"Импорт" батырмасын басыңыз</li>
          </ol>
          
          <button 
            className="btn-template" 
            onClick={handleDownloadTemplate}
            disabled={loading}
          >
            📥 Үлгі файлды жүктеу
          </button>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="teacher-select">Оқытушы *</label>
            <select
              id="teacher-select"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              disabled={loading}
              className="form-select"
            >
              <option value="">Оқытушыны таңдаңыз</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester-select">Семестр *</label>
            <select
              id="semester-select"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              disabled={loading}
              className="form-select"
            >
              <option value="">Семестрді таңдаңыз</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.academicYear} - {semester.number} семестр
                  {semester.isActive && ' (Белсенді)'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file-input">Excel файлы *</label>
            <div className="file-input-wrapper">
              <input
                id="file-input"
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                disabled={loading}
                className="file-input"
              />
              {selectedFile && (
                <div className="selected-file">
                  📄 {selectedFile.name}
                  <button 
                    onClick={() => {
                      setSelectedFile(null)
                      document.getElementById('file-input').value = ''
                    }}
                    className="btn-remove"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              onClick={handleValidate}
              disabled={!selectedFile || loading}
              className="btn-secondary"
            >
              🔍 Тексеру
            </button>
            <button
              onClick={handleImport}
              disabled={!selectedFile || !teacherId || !semesterId || loading}
              className="btn-primary"
            >
              {loading ? '⏳ Импорт жүруде...' : '✅ Импорт'}
            </button>
          </div>
        </div>
      </div>

      {importResult && (
        <div className="import-results">
          <h3>Импорт нәтижесі</h3>
          <div className="stats">
            <div className="stat-card success">
              <div className="stat-value">{importResult.imported}</div>
              <div className="stat-label">Сәтті импорт</div>
            </div>
            <div className="stat-card error">
              <div className="stat-value">{importResult.errors}</div>
              <div className="stat-label">Қателер</div>
            </div>
            <div className="stat-card warning">
              <div className="stat-value">{importResult.warnings}</div>
              <div className="stat-label">Ескертулер</div>
            </div>
            <div className="stat-card total">
              <div className="stat-value">{importResult.total}</div>
              <div className="stat-label">Барлығы</div>
            </div>
          </div>

          {importResult.details?.errors?.length > 0 && (
            <div className="errors-list">
              <h4>Қателер:</h4>
              <ul>
                {importResult.details.errors.map((err, idx) => (
                  <li key={idx}>
                    <strong>Жол {err.row}:</strong> {err.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {importResult.details?.warnings?.length > 0 && (
            <div className="warnings-list">
              <h4>Ескертулер:</h4>
              <ul>
                {importResult.details.warnings.map((warn, idx) => (
                  <li key={idx}>
                    <strong>Жол {warn.row}:</strong> {warn.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ExcelImport

