import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Globe, Palette, ShieldCheck } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'We believe art has the power to transform spaces and inspire emotions. Every piece we curate reflects our commitment to artistic excellence.'
    },
    {
      icon: Users,
      title: 'Artist First',
      description: 'We support artists by providing a platform to showcase their work and connect with art lovers worldwide, ensuring fair compensation.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Each artwork undergoes careful verification to ensure authenticity and quality, giving you confidence in every purchase.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connecting artists and collectors from around the world, we celebrate diverse artistic traditions and contemporary innovation.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Curated Artworks' },
    { number: '50+', label: 'Talented Artists' },
    { number: '1000+', label: 'Happy Customers' },
    { number: '15+', label: 'Countries Reached' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-neutral-50 via-amber-50/30 to-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
              About Artisan Gallery
            </h1>
            <p className="text-lg md:text-xl text-neutral-600">
              Where exceptional artistry meets passionate collectors. We're building a global community 
              that celebrates creativity, craftsmanship, and the transformative power of art.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Founded with a vision to make exceptional art accessible to everyone, Artisan Gallery 
                began as a small collective of art enthusiasts who believed in the power of creativity 
                to enrich lives.
              </p>
              <p>
                What started as a passion project has grown into a thriving marketplace connecting 
                talented artists with collectors worldwide. We've carefully curated a diverse collection 
                spanning traditional crafts, contemporary paintings, and everything in between.
              </p>
              <p>
                Today, we're proud to support emerging and established artists while helping customers 
                discover pieces that resonate with their personal style and transform their spaces.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600"
                alt="Art gallery"
                className="rounded-lg aspect-[4/5] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600"
                alt="Artist at work"
                className="rounded-lg aspect-[4/5] object-cover mt-8"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </p>
                <p className="text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-amber-100 rounded-lg">
                  <value.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              More than just a marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center"
            >
              <div className="inline-flex p-4 bg-amber-100 rounded-full mb-4">
                <Palette className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Curated Collections
              </h3>
              <p className="text-neutral-600">
                Every artwork is carefully selected for quality, uniqueness, and artistic merit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center"
            >
              <div className="inline-flex p-4 bg-rose-100 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Authenticity Guaranteed
              </h3>
              <p className="text-neutral-600">
                All pieces are verified originals with certificates of authenticity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center"
            >
              <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Artist Support
              </h3>
              <p className="text-neutral-600">
                We ensure artists receive fair compensation and recognition for their work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-neutral-900 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Whether you're an art lover looking for the perfect piece or an artist wanting to 
            showcase your work, we'd love to have you as part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="px-8 py-3 bg-white text-neutral-900 rounded-md font-medium hover:bg-neutral-100 transition-colors"
            >
              Browse Artworks
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
