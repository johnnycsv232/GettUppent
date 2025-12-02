'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Image, Download, X, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

// Sample gallery data - in production this would come from Firestore
const SAMPLE_GALLERIES = [
  {
    id: 'g1',
    venue: 'Skyline Lounge',
    date: '2025-11-15',
    photoCount: 45,
    status: 'delivered',
    coverUrl: null,
    photos: Array(45).fill(null).map((_, i) => ({
      id: `p${i}`,
      url: null,
      thumbnail: null
    }))
  },
  {
    id: 'g2',
    venue: 'The Underground',
    date: '2025-11-08',
    photoCount: 62,
    status: 'delivered',
    coverUrl: null,
    photos: Array(62).fill(null).map((_, i) => ({
      id: `p${i}`,
      url: null,
      thumbnail: null
    }))
  },
  {
    id: 'g3',
    venue: 'Club Nova',
    date: '2025-11-01',
    photoCount: 38,
    status: 'processing',
    coverUrl: null,
    photos: []
  }
];

export default function GalleryPage() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeGallery = SAMPLE_GALLERIES.find(g => g.id === selectedGallery);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <PublicHeader />

      {/* Hero */}
      <section className="py-16 px-6 text-center border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Image className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-bold tracking-widest uppercase text-purple-400">Photo Gallery</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase">
          Your Photos, <span className="text-purple-400">Delivered</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Access your event photos within 24-72 hours. Download high-resolution files ready for social media.
        </p>
      </section>

      {/* Gallery Grid or Detail View */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {!selectedGallery ? (
            // Gallery List View
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Recent Galleries</h2>
                <p className="text-gray-500 text-sm">Login to access your private galleries</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_GALLERIES.map((gallery) => (
                  <div
                    key={gallery.id}
                    onClick={() => gallery.status === 'delivered' && setSelectedGallery(gallery.id)}
                    className={`group relative aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden border border-white/5 ${
                      gallery.status === 'delivered' ? 'cursor-pointer hover:border-purple-500/50' : 'opacity-60'
                    }`}
                  >
                    {/* Placeholder Cover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black flex items-center justify-center">
                      <span className="text-6xl font-black text-white/10">{gallery.venue.charAt(0)}</span>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-lg font-bold text-white">{gallery.venue}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(gallery.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-gray-300">{gallery.photoCount} photos</span>
                        {gallery.status === 'processing' ? (
                          <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                            Processing
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                            Ready
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Lock for processing */}
                    {gallery.status === 'processing' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Lock className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Gallery Detail View
            <>
              <button
                onClick={() => setSelectedGallery(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                Back to Galleries
              </button>

              {activeGallery && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold">{activeGallery.venue}</h2>
                      <p className="text-gray-400">
                        {new Date(activeGallery.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} • {activeGallery.photoCount} photos
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors">
                      <Download className="h-5 w-5" />
                      Download All
                    </button>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {activeGallery.photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        onClick={() => setLightboxIndex(index)}
                        className="aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black/50 flex items-center justify-center">
                          <span className="text-sm text-gray-500 font-mono">{String(index + 1).padStart(3, '0')}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Image className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && activeGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
            disabled={lightboxIndex === 0}
            className="absolute left-6 p-2 text-gray-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          
          <button
            onClick={() => setLightboxIndex(Math.min(activeGallery.photos.length - 1, lightboxIndex + 1))}
            disabled={lightboxIndex === activeGallery.photos.length - 1}
            className="absolute right-6 p-2 text-gray-400 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          {/* Photo placeholder */}
          <div className="max-w-4xl max-h-[80vh] aspect-[3/2] bg-gray-800 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Image className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Photo {lightboxIndex + 1} of {activeGallery.photos.length}</p>
            </div>
          </div>

          {/* Download button */}
          <button className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      )}

      <PublicFooter />
    </main>
  );
}
