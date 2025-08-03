import { motion } from 'framer-motion';

const TemplateSkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg"
        >
          {/* QR Preview Skeleton */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 p-8">
            <div className="absolute top-4 left-4 z-10">
              <div className="w-20 h-6 bg-gray-300 dark:bg-slate-600 rounded-full animate-pulse" />
            </div>
            
            {/* QR Code Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-gray-300 dark:bg-slate-600 rounded-lg animate-pulse" />
            </div>
          </div>
          
          {/* Template Info Skeleton */}
          <div className="p-6">
            <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mb-3 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateSkeletonLoader;