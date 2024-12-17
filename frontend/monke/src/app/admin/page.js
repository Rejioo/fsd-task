// app/admin/page.js
'use client'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees/all')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      setError('Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  // const deleteEmployee = async (id) => {
  //   if (confirm('Are you sure you want to delete this employee?')) {
  //     try {
  //       const response = await fetch(`http://localhost:5000/delete/${id}`, {
  //         method: 'DELETE'
  //       })
  //       if (!response.ok) throw new Error('Failed to delete')
  //       fetchEmployees()
  //     } catch (err) {
  //       setError('Failed to delete employee')
  //     }
  //   }
  // }

//   const deleteEmployee = async (id) => {
//   if (confirm('Are you sure you want to delete this employee?')) {
//     try {
//       const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
//         method: 'DELETE'
//       })
//       if (!response.ok) throw new Error('Failed to delete')
//       fetchEmployees()
//     } catch (err) {
//       setError('Failed to delete employee')
//     }
//   }
// }
  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">employee_id</th>
              <th className="px-4 py-2">email</th>
              <th className="px-4 py-2">phone</th>
              <th className="px-4 py-2">dept</th>
              <th className="px-4 py-2">date of joining</th>
              <th className="px-4 py-2">role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.employee_id}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.department}</td>
                <td className="px-4 py-2">{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                <td className="px-4 py-2">{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
