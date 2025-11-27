import Link from 'next/link';
import { Camera, Clock, CheckCircle, Star, Zap, Users, ArrowRight, Crown } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'pilot',
      name: 'Pilot Night',
      price: '$345',
      period: 'one-time',
      description: 'Test our engine before you commit. One night to prove it.',
      features: [
        '1 On-Site Content Shoot',
        '30 High-End Edited Photos',
        '72h Delivery Turnaround',
        'Social Strategy Audit',
        'No Commitment Required'
      ],
      cta: 'Book Your Pilot',
      highlight: false,
      badge: 'Start Here'
    },
    {
      id: 't1',
      name: 'Tier 1',
      price: '$445',
      period: '/month',
      description: 'Essential coverage for venues building their content presence.',
      features: [
        '2 Shoots per Month',
        '60 Edited Photos',
        '72h Delivery Guarantee',
        'Content Calendar Support',
        'Monthly Analytics Report'
      ],
      cta: 'Get Started',
      highlight: false,
      badge: null
    },
    {
      id: 't2',
      name: 'Tier 2',
      price: '$695',
      period: '/month',
      description: 'Our most popular package. Full-throttle content engine.',
      features: [
        '4 Shoots per Month',
        '120 Edited Photos',
        '48h Delivery Guarantee',
        'Priority Scheduling',
        'Dedicated Account Manager',
        'Social Media Templates'
      ],
      cta: 'Most Popular',
      highlight: true,
      badge: 'Best Value'
    },
    {
      id: 'vip',
      name: 'VIP',
      price: '$995',
      period: '/month',
      description: 'White-glove service for premium venues. 24h delivery.',
      features: [
        'Unlimited Shoots',
        'Unlimited Photos',
        '24h Delivery Guarantee',
        'Dedicated Photographer',
        'Event Coverage Included',
        'Video Content Add-On',
        'Brand Partnership Priority'
      ],
      cta: 'Go VIP',
      highlight: false,
      badge: 'Premium'
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <Crown className="h-6 w-6 text-brand-gold" />
            GETTUPP<span className="text-brand-gold">ENT</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/services" className="text-brand-gold font-medium">Services</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link>
            <Link href="/login" className="px-4 py-2 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
          <Camera className="h-4 w-4 text-brand-gold" />
          <span className="text-sm font-bold tracking-widest uppercase text-brand-gold">Photography Services</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">
          We Own Your <span className="text-brand-gold">Nightlife Content</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Stop chasing flaky freelancers. Predictable content engine for Minneapolis venues. 
          One night to prove it.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <Clock className="h-4 w-4 text-brand-gold" />
            <span>24-72h Delivery</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <Zap className="h-4 w-4 text-brand-gold" />
            <span>≤2.3 min/photo edit</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
            <Users className="h-4 w-4 text-brand-gold" />
            <span>Minneapolis Venues</span>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                  service.highlight
                    ? 'border-brand-gold bg-gradient-to-b from-brand-gold/10 to-transparent'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {service.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    service.highlight ? 'bg-brand-gold text-black' : 'bg-white/10 text-white'
                  }`}>
                    {service.badge}
                  </div>
                )}
                
                <h3 className="text-2xl font-black uppercase mb-2">{service.name}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-black ${service.highlight ? 'text-brand-gold' : ''}`}>
                    {service.price}
                  </span>
                  <span className="text-gray-500">{service.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${service.highlight ? 'text-brand-gold' : 'text-gray-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/schedule?tier=${service.id}`}
                  className={`block w-full text-center py-3 rounded-lg font-bold uppercase tracking-wider transition-all ${
                    service.highlight
                      ? 'bg-brand-gold text-black hover:bg-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-6">
            Why We <span className="text-brand-gold">Never Miss</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Most photographers are artists. <span className="text-white font-bold">We are an operations company.</span>
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-brand-gold">The ShotClock</h3>
            <p className="text-gray-300 mb-6">
              Our internal SLA monitor triggers <span className="text-yellow-400">Amber Alert at T-12h</span> and{' '}
              <span className="text-red-400">Red Alert at T-2h</span>, ensuring we never miss deadlines.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold/20 rounded-full text-brand-gold font-mono font-bold">
              <Zap className="h-5 w-5" />
              KPI: ≤2.3 min/photo edit time
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objection Handling */}
      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-12 text-center">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">"We already have a photographer."</h3>
              <p className="text-gray-400">
                We're not just photographers; we're a content engine with guaranteed 24–72h delivery, 
                eliminating freelance inconsistency.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">"Your pricing is high."</h3>
              <p className="text-gray-400">
                It breaks down to $9–12 per post. We sell predictable ROI and eliminate freelance inconsistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-black uppercase mb-6">
          Ready to <span className="text-brand-gold">Take Over?</span>
        </h2>
        <p className="text-gray-400 mb-8">Start with a $345 pilot night. Zero commitment.</p>
        <Link
          href="/schedule?tier=pilot"
          className="inline-flex items-center gap-3 px-10 py-4 bg-brand-gold text-black font-black uppercase tracking-wider hover:bg-white transition-colors"
        >
          Book Your Pilot <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#020202] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter">
            GETTUPP<span className="text-brand-gold">ENT</span>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link href="/shop" className="hover:text-brand-pink transition-colors">Shop</Link>
            <Link href="/login" className="hover:text-brand-gold transition-colors">Login</Link>
          </div>
          <div className="text-gray-600 text-xs uppercase tracking-widest">
            &copy; 2025 GettUpp ENT
          </div>
        </div>
      </footer>
    </main>
  );
}
