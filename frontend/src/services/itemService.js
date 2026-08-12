const API_URL = 'http://localhost:5000/api/items'

export const getItems = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }

  return response.json()
}

export const getItemById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch item')
  }

  return response.json()
}

export const createItem = async (itemData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })

  if (!response.ok) {
    throw new Error('Failed to create item')
  }

  return response.json()
}

export const updateItemStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update item')
  }

  return response.json()
}

export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete item')
  }

  return response.json()
}