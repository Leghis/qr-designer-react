

import { motion } from 'framer-motion';

const TemplateSkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.05, 0.3) }}
          className="group cursor-pointer"
        >
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg">
            {/* Category Badge Skeleton */}
            <div className="absolute top-4 left-4 z-10">
              <div className="w-20 h-6 bg-gray-300/70 dark:bg-slate-600/70 backdrop-blur-sm rounded-full animate-pulse shadow-lg border border-white/20 dark:border-slate-700/50" />
            </div>
            
            {/* QR Preview Skeleton */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-8 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />
              </div>
              
              {/* QR Code Placeholder with shimmer effect */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <div className="w-3/4 h-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-slate-400/40 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
            
            {/* Template Info Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title skeleton */}
              <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 rounded w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-slate-400/40 to-transparent animate-shimmer" />
              </div>
              
              {/* Button skeleton */}
              <div className="w-full py-3 px-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-slate-400/40 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateSkeletonLoader;