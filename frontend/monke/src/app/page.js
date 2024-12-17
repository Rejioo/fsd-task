'use client'
import { globals } from './globals.css'
import { useState } from 'react'
import { addEmployeeApi } from './api/employeeApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EmployeeForm() {
  const initialState = {
    name: '',
    employee_id: '',
    email: '',
    phone: '',
    department: '',
    date_of_joining: '',
    role: ''
  }
  const router = useRouter()
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // name val
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }
      
    // empid val
    if (!formData.employee_id) {
      newErrors.employee_id='Employee ID is required'
    }

    // email val
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email='Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email='Please enter a valid email address'
    }

    // phn valiation
    const phoneRegex = /^\d{10}$/ // Assumes 10-digit phone number, modify as needed
    if (!formData.phone) {
      newErrors.phone='Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone='Please enter a valid 10-digit phone number'
    }

    // department val
    if (!formData.department) {
      newErrors.department='Please select a department'
    }

    // join date val
    if (!formData.date_of_joining) {
      newErrors.date_of_joining='Join date is required'
    }

    // role val
    if (!formData.role) {
      newErrors.role ='Please select a role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Check if employee ID is unique
      const isEmployeeIdUnique = await checkEmployeeIdUnique(formData.employee_id)
      if (!isEmployeeIdUnique) {
        setErrors(prev => ({
          ...prev,
          employee_id: 'emp id exists'
        }))
        setIsSubmitting(false)
        return
      }

      const result = await addEmployeeApi(formData)
      console.log('Employee added:', result)
      setFormData(initialState)
      router.push('/success')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const checkEmployeeIdUnique = async (id) => {
    try {
      //yet to do
      return true
    } catch (error) {
      console.error('Error checking employee ID:', error)
      return false
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Employee Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Link href="/admin">Dashboard</Link>

        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Employee ID */}
        <div>
          <label className="block mb-1">Employee ID</label>
          <input
            type="number"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.employee_id ? 'border-red-500' : ''}`}
          />
          {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.department ? 'border-red-500' : ''}`}
          >
            <option value="">Select Department</option>
            <option value="Finance">Finance</option>
            <option value="Security">Security</option>
            <option value="Marketing">IT</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Join Date */}
        <div>
          <label className="block mb-1">Join Date</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.date_of_joining ? 'border-red-500' : ''}`}
          />
          {errors.date_of_joining && <p className="text-red-500 text-sm mt-1">{errors.date_of_joining}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.role ? 'border-red-500' : ''}`}
          >
            <option value="">Select Role</option>
            <option value="intern">Intern</option>
            <option value="Developer">developer</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-white p-2 rounded 
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
