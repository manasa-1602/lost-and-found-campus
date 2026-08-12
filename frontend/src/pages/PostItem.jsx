import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../services/itemService'

const CLOUDINARY_CLOUD_NAME = 'vl3ddal4'
const CLOUDINARY_UPLOAD_PRESET = 'lost_and_found'

function PostItem() {
  const navigate = useNavigate()

  const [itemType, setItemType] = useState('Lost')
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    date: '',
    description: '',
    contact: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setImagePreview('')
      setImageFile(null)
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  if (
    !formData.title ||
    !formData.category ||
    !formData.location ||
    !formData.date ||
    !formData.description ||
    !formData.contact
  ) {
    setError('Please fill in all required fields.')
    return
  }

  try {
    setLoading(true)
    setError('')

    let imageUrl = ''

    if (imageFile) {
      const uploadData = new FormData()

      uploadData.append('file', imageFile)
      uploadData.append(
        'upload_preset',
        CLOUDINARY_UPLOAD_PRESET
      )

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      )

      if (!cloudinaryResponse.ok) {
        throw new Error('Image upload failed')
      }

      const cloudinaryData =
        await cloudinaryResponse.json()

      imageUrl = cloudinaryData.secure_url
    }

    const newItem = {
      ...formData,
      type: itemType,
      status: itemType,
      image: imageUrl,
    }

    await createItem(newItem)

    navigate('/')
  } catch (error) {
    console.error(error)
    setError('Failed to post item. Please try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-gray-500">
          CAMPUS LOST & FOUND
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Post an Item
        </h2>

        <p className="mt-2 text-gray-600">
          Help someone find what they have lost or report something
          you found on campus.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Item Type */}

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              What are you posting?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setItemType('Lost')}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  itemType === 'Lost'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <span className="block text-base font-semibold">
                  I Lost Something
                </span>

                <span
                  className={`mt-1 block text-xs ${
                    itemType === 'Lost'
                      ? 'text-gray-300'
                      : 'text-gray-500'
                  }`}
                >
                  Report an item you have lost.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setItemType('Found')}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  itemType === 'Found'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <span className="block text-base font-semibold">
                  I Found Something
                </span>

                <span
                  className={`mt-1 block text-xs ${
                    itemType === 'Found'
                      ? 'text-gray-300'
                      : 'text-gray-500'
                  }`}
                >
                  Report an item you found.
                </span>
              </button>
            </div>
          </div>

          {/* Item Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Item Name *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Black Backpack"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="ID Cards">ID Cards</option>
              <option value="Bags">Bags</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Keys">Keys</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Location *
            </label>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            >
              <option value="">Select a location</option>
              <option value="Library">Library</option>
              <option value="Classroom">Classroom</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Cafeteria">Cafeteria</option>
              <option value="Parking">Parking</option>
              <option value="Playground">Playground</option>
              <option value="Hostel">Hostel</option>
              <option value="Auditorium">Auditorium</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Date *
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the item. Include useful details such as color, brand, identifying marks, or where exactly it was found."
              className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Item Image
            </label>

            <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center transition hover:border-gray-400">
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto mb-4 h-48 w-full max-w-md rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('')
                      setImageFile(null)
                    }}
                    className="text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mx-auto block w-full max-w-xs text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
                  />

                  <p className="mt-3 text-xs text-gray-400">
                    Upload a clear image of the item.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Contact */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Contact Information *
            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Email or phone number"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              This will help the owner contact you about the item.
            </p>
          </div>

          {/* Error */}

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}

          <div className="border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Posting...'
                : `Post ${itemType} Item`}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default PostItem