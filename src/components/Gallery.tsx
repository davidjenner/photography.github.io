import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';
import { SocialLinks } from './SocialLinks';
import { galleryItems } from '../data/gallery';
import { GalleryImage } from '../types/gallery';

type FilterType = 'all' | 'category' | 'location';

const ITEMS_PER_PAGE = 50;
const MASONRY_BREAKPOINTS = {
  default: 3,
  1100: 2,
  700: 1
};

// Extract unique categories and locations from gallery items
const allCategories = Array.from(
  new Set(galleryItems.flatMap(item => item.categories))
).sort();

const allLocations = Array.from(
  new Set(galleryItems.map(item => item.location))
).sort();

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const filteredItems = galleryItems.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === 'category' && selectedFilter) return item.categories.includes(selectedFilter);
    if (filterType === 'location' && selectedFilter) return item.location === selectedFilter;
    return true;
  });

  useEffect(() => {
    if (inView && visibleItems < filteredItems.length) {
      setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
    }
  }, [inView, filteredItems.length]);

  const handleImageClick = (id: number) => setSelectedImage(id);
  const handleClose = () => setSelectedImage(null);
  const handleFilterChange = (type: FilterType, value: string = '') => {
    if (type === filterType && !value) {
      setFilterType('all');
      setSelectedFilter('');
    } else {
      setFilterType(type);
      setSelectedFilter(value);
    }
    setVisibleItems(ITEMS_PER_PAGE);
  };

  const selectedItem = selectedImage !== null 
    ? galleryItems.find(item => item.id === selectedImage)
    : null;

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="py-8 px-4">
        <h1 className="text-4xl font-bold text-white text-center">Photo Gallery</h1>
      </header>

      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Photos
            </button>
            <button
              onClick={() => handleFilterChange('category')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'category'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleFilterChange('location')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'location'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Locations
            </button>
          </div>

          {filterType === 'category' && (
            <div className="flex flex-wrap justify-center gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {filterType === 'location' && (
            <div className="flex flex-wrap justify-center gap-2">
              {allLocations.map(location => (
                <button
                  key={location}
                  onClick={() => handleFilterChange('location', location)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedFilter === location
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Masonry
          breakpointCols={MASONRY_BREAKPOINTS}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredItems.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="mb-4 relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleImageClick(item.id)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{
                  aspectRatio: `${item.width}/${item.height}`,
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.categories.map(category => (
                      <span key={category} className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
        
        {visibleItems < filteredItems.length && (
          <div ref={ref} className="h-10" />
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>
          <div className="max-w-7xl mx-auto px-4">
            <img
              src={selectedItem.fullSize}
              alt={selectedItem.title}
              className="max-h-[90vh] w-auto mx-auto"
            />
            <div className="text-white text-center mt-4">
              <h2 className="text-2xl font-semibold">{selectedItem.title}</h2>
              <p className="text-gray-300">{selectedItem.description}</p>
              <div className="flex justify-center gap-2 mt-2">
                {selectedItem.categories.map(category => (
                  <span key={category} className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mt-2">{selectedItem.location}</p>
              {selectedItem.metadata && (
                <div className="mt-4 text-sm">
                  <p>Taken on: {selectedItem.metadata.dateTaken}</p>
                  <p>Camera: {selectedItem.metadata.camera}</p>
                  {selectedItem.metadata.settings && (
                    <p>
                      Settings: {selectedItem.metadata.settings.aperture}, 
                      {selectedItem.metadata.settings.shutterSpeed}, 
                      ISO {selectedItem.metadata.settings.iso}, 
                      {selectedItem.metadata.settings.focalLength}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 pb-8">
        <SocialLinks />
      </footer>
    </div>
  );
}

export default Gallery;