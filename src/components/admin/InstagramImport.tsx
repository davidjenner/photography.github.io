import React, { useState, useEffect } from 'react';
import { Instagram, Import, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import queryString from 'query-string';
import { supabase } from '../../lib/supabase';

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  caption?: string;
  timestamp: string;
  categories: string[];
}

interface MediaSelection {
  id: string;
  categories: string[];
}

export default function InstagramImport() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mediaList, setMediaList] = useState<InstagramMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Map<string, MediaSelection>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    
    // Check URL parameters for Instagram authorization response
    const params = queryString.parse(window.location.search);
    if (params.code) {
      handleInstagramCallback(params.code as string);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('categories');

      if (error) throw error;

      const categories = new Set<string>();
      data.forEach(item => {
        if (item.categories) {
          item.categories.forEach((category: string) => categories.add(category));
        }
      });
      setAvailableCategories(Array.from(categories).sort());
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleInstagramCallback = async (code: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('instagram-auth', {
        body: { code }
      });

      if (error) throw error;
      
      setIsAuthorized(true);
      await fetchInstagramMedia(data.access_token);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      toast.error('Failed to connect to Instagram');
    }
  };

  const connectInstagram = () => {
    const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
    const redirectUri = `${window.location.origin}/admin/dashboard`;
    const scope = 'user_profile,user_media';
    
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    
    window.location.href = authUrl;
  };

  const fetchInstagramMedia = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('instagram-media', {
        body: { accessToken }
      });

      if (error) throw error;
      
      const mediaWithCategories = data.media.map((item: InstagramMedia) => ({
        ...item,
        categories: ['Instagram'] // Default category
      }));
      
      setMediaList(mediaWithCategories);
    } catch (error) {
      toast.error('Failed to fetch Instagram media');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMediaSelection = (media: InstagramMedia) => {
    const newSelection = new Map(selectedMedia);
    if (newSelection.has(media.id)) {
      newSelection.delete(media.id);
    } else {
      newSelection.set(media.id, {
        id: media.id,
        categories: media.categories
      });
    }
    setSelectedMedia(newSelection);
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;
    
    if (!availableCategories.includes(newCategory)) {
      setAvailableCategories(prev => [...prev, newCategory].sort());
    }
    setNewCategory('');
  };

  const toggleCategory = (mediaId: string, category: string) => {
    const selection = selectedMedia.get(mediaId);
    if (!selection) return;

    const newSelection = new Map(selectedMedia);
    const categories = selection.categories.includes(category)
      ? selection.categories.filter(c => c !== category)
      : [...selection.categories, category];

    newSelection.set(mediaId, {
      ...selection,
      categories
    });
    setSelectedMedia(newSelection);
  };

  const importSelected = async () => {
    try {
      setIsLoading(true);
      const selectedItems = Array.from(selectedMedia.values()).map(selection => {
        const media = mediaList.find(m => m.id === selection.id);
        return {
          ...media,
          categories: selection.categories
        };
      });
      
      const { error } = await supabase.functions.invoke('instagram-import', {
        body: { media: selectedItems }
      });

      if (error) throw error;

      toast.success('Images imported successfully');
      setSelectedMedia(new Map());
    } catch (error) {
      toast.error('Failed to import images');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Instagram className="text-pink-500" />
          Import from Instagram
        </h2>
        {!isAuthorized && (
          <button
            onClick={connectInstagram}
            className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
          >
            <Instagram size={20} />
            Connect Instagram
          </button>
        )}
      </div>

      {isAuthorized && (
        <>
          {/* Category Management */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="New category"
              />
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {mediaList.map((media) => (
              <div
                key={media.id}
                className={`bg-gray-700 rounded-lg overflow-hidden ${
                  selectedMedia.has(media.id) ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => toggleMediaSelection(media)}
                >
                  <img
                    src={media.media_url}
                    alt={media.caption || 'Instagram photo'}
                    className="w-full h-48 object-cover"
                  />
                  {selectedMedia.has(media.id) && (
                    <div className="absolute inset-0 bg-pink-500 bg-opacity-30 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2">
                        <X className="text-pink-500" size={20} />
                      </div>
                    </div>
                  )}
                </div>

                {selectedMedia.has(media.id) && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2">Categories:</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map(category => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(media.id, category)}
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedMedia.get(media.id)?.categories.includes(category)
                              ? 'bg-pink-600 text-white'
                              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedMedia.size > 0 && (
            <button
              onClick={importSelected}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
            >
              <Import size={20} />
              Import {selectedMedia.size} Selected {selectedMedia.size === 1 ? 'Image' : 'Images'}
            </button>
          )}
        </>
      )}
    </div>
  );
}