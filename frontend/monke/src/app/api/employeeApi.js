// app/api/employeeApi.js
export const addEmployeeApi = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/employees/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to add employee:', error);
    throw error;
  }
};
