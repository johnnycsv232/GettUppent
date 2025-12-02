'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  venue: string;
  date: string;
  aspect: 'tall' | 'wide' | 'square';
}

const galleryItems: GalleryItem[] = [
  { id: 1, src: '/images/gallery/gallery-1.jpg', venue: 'The Warehouse', date: 'Nov 14', aspect: 'tall' },
  { id: 2, src: '/images/gallery/gallery-2.jpg', venue: 'Vanquish', date: 'Nov 12', aspect: 'wide' },
  { id: 3, src: '/images/gallery/gallery-3.jpg', venue: 'Rabbit Hole', date: 'Nov 10', aspect: 'square' },
  { id: 4, src: '/images/gallery/gallery-4.jpg', venue: 'Club Nova', date: 'Nov 08', aspect: 'square' },
  { id: 5, src: '/images/gallery/gallery-5.jpg', venue: 'The Loft', date: 'Nov 06', aspect: 'tall' },
  { id: 6, src: '/images/gallery/gallery-6.jpg', venue: 'First Avenue', date: 'Nov 04', aspect: 'wide' },
];

export default function GallerySection() {
  return (
    <section className="py-20 md:py-32 bg-brand-ink">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-16">
          THE <span className="gold-gradient-text">GETTUPP</span> LOOK
        </h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer ${
                item.aspect === 'tall' ? 'aspect-[3/4]' : 
                item.aspect === 'wide' ? 'aspect-[4/3]' : 
                'aspect-square'
              }`}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gray-800">
                <Image
                  src={item.src}
                  alt={`${item.venue} - ${item.date}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Date Badge - Always Visible */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded bg-black/70 backdrop-blur-sm">
                <span className="text-xs font-bold text-white">{item.date}</span>
                <span className="text-xs text-gray-400"> - {item.venue}</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold">{item.venue}</p>
                  <p className="text-brand-gold text-sm">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:text-brand-gold transition-colors"
          >
            Explore Full Gallery <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
