import { Link } from 'react-router';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
  index?: number;
}

export default function CategoryCard({ name, image, count, index = 0 }: CategoryCardProps) {
  const formatCategoryName = (category: string) => {
    // Convert camelCase to space-separated words
    return category.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/category/${name}`}
        className="group block relative overflow-hidden rounded-lg aspect-square"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-serif font-semibold mb-1">
              {formatCategoryName(name)}
            </h3>
            <p className="text-sm opacity-90">{count} artworks</p>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-colors duration-300 rounded-lg" />
      </Link>
    </motion.div>
  );
}
