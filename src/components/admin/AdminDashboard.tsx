import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { GalleryImage } from '../../types/gallery';
import { galleryItems } from '../../data/gallery';
import InstagramImport from './InstagramImport';

interface ImageUpload {
  file: File;
  preview: string;
  title: string;
  description: string;
  categories: string[];
  location: string;
}

export default function AdminDashboard() {
  const [uploads, setUploads] = useState<ImageUpload[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploads = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: '',
      description: '',
      categories: [],
      location: ''
    }));
    setUploads(prev => [...prev, ...newUploads]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSave = async (upload: ImageUpload) => {
    try {
      // Here you would typically:
      // 1. Upload the image to your storage
      // 2. Process the image to create thumbnails
      // 3. Save the metadata to your database
      
      toast.success('Image saved successfully');
      setUploads(prev => prev.filter(u => u !== upload));
    } catch (error) {
      toast.error('Failed to save image');
    }
  };

  const handleDelete = (imageId: number) => {
    // Here you would typically delete the image from storage and database
    toast.success('Image deleted successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-500/10' : ''
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-4" size={48} />
              <p>Drag & drop images here, or click to select files</p>
            </div>

            {/* Category Management */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New category"
                />
                <button
                  onClick={() => {
                    if (newCategory.trim()) {
                      // Add new category logic here
                      setNewCategory('');
                      toast.success('Category added');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(galleryItems.flatMap(item => item.categories))).map(category => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {category}
                    <button
                      onClick={() => {
                        // Delete category logic here
                        toast.success('Category deleted');
                      }}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Instagram Import Section */}
          <InstagramImport />

          {/* Uploads Preview */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Pending Uploads</h2>
            <div className="space-y-4">
              {uploads.map((upload, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <img
                    src={upload.preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <input
                    type="text"
                    value={upload.title}
                    onChange={(e) => {
                      const newUploads = [...uploads];
                      newUploads[index].title = e.target.value;
                      setUploads(newUploads);
                    }}
                    className="w-full px-3 py-2 bg-gray-600 rounded-lg mb-2"
                    placeholder="Title"
                  />
                  <textarea
                    value={upload.description}
                    onChange={(e) => {
                      const newUploads = [...uploads];
                      newUploads[index].description = e.target.value;
                      setUploads(newUploads);
                    }}
                    className="w-full px-3 py-2 bg-gray-600 rounded-lg mb-2"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={upload.location}
                    onChange={(e) => {
                      const newUploads = [...uploads];
                      newUploads[index].location = e.target.value;
                      setUploads(newUploads);
                    }}
                    className="w-full px-3 py-2 bg-gray-600 rounded-lg mb-2"
                    placeholder="Location"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        URL.revokeObjectURL(upload.preview);
                        setUploads(uploads.filter((_, i) => i !== index));
                      }}
                      className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X size={18} />
                    </button>
                    <button
                      onClick={() => handleSave(upload)}
                      className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Existing Images */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Existing Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((image: GalleryImage) => (
              <div key={image.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{image.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {image.categories.map(category => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-blue-600 rounded-full text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}