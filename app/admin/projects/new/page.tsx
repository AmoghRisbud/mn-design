'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateProjectInput } from '@/lib/types';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<CreateProjectInput>({
    title: '',
    description: '',
    location: '',
    year: new Date().getFullYear(),
    category: 'residential',
    images: [],
    featured: false,
    area: '',
    client: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    setLoading(true);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/projects');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Uploading file:', file.name);
        
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Upload successful:', data.url);
          return data.url;
        } else {
          const error = await res.json();
          console.error('Upload failed:', error);
          throw new Error(error.error || 'Failed to upload image');
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      console.log('All uploads completed successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="institutional">Institutional</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 5}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (optional)
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g., 5,000 sq ft"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client (optional)
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Images *
            </label>
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-blue-600 font-semibold">
                      {uploading ? 'Uploading...' : 'Click to upload images'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    disabled={uploading || loading}
                  />
                </label>
              </div>
            </div>
            
            {formData.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Images ({formData.images.length}):</p>
                <div className="grid grid-cols-1 gap-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <img src={img} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                      <span className="flex-1 text-sm text-gray-600 truncate">{img}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 hover:bg-red-50 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
              Mark as Featured Project
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploading || formData.images.length === 0}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : uploading ? 'Uploading Images...' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading || uploading}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
