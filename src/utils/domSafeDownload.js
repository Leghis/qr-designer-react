import { useEffect, useRef } from 'react';

/**
 * Safe Download Manager - Bulletproof DOM manipulation for downloads
 * Prevents "Failed to execute 'removeChild' on 'Node'" errors
 */
class SafeDownloadManager {
  constructor() {
    this.activeLinks = new Set();
    this.timeouts = new Map();
    this.isDestroyed = false;
  }

  /**
   * Safely creates and clicks a download link
   * @param {string} url - The blob URL or data URL
   * @param {string} filename - The filename for download
   * @param {Object} options - Additional options
   * @returns {Promise<void>}
   */
  async triggerDownload(url, filename, options = {}) {
    if (this.isDestroyed) {
      console.warn('Download manager is destroyed, ignoring download request');
      return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    // Track the link
    this.activeLinks.add(link);

    try {
      // Use documentElement instead of body for better compatibility
      const container = document.documentElement || document.body;
      
      if (!container) {
        throw new Error('No container available for download link');
      }

      container.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Clean up immediately - no need for setTimeout
      this.safeRemoveElement(link);
      
      // Revoke blob URL if it's a blob URL
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }

      // Call success callback
      if (options.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      console.error('Download failed:', error);
      
      // Ensure cleanup even on error
      this.safeRemoveElement(link);
      
      if (url.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // Ignore revoke errors
        }
      }

      // Call error callback
      if (options.onError) {
        options.onError(error);
      }
    } finally {
      // Remove from tracking
      this.activeLinks.delete(link);
    }
  }

  /**
   * Safely removes an element from DOM
   * @param {HTMLElement} element 
   */
  safeRemoveElement(element) {
    if (!element) return;

    try {
      // Multiple safety checks
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      } else if (element.remove && typeof element.remove === 'function') {
        element.remove();
      } else {
        // Last resort - check if element is in document
        if (document.contains(element)) {
          document.documentElement.removeChild(element);
        }
      }
    } catch (error) {
      // Silently ignore - element was already removed
      console.debug('Element already removed:', error.message);
    }
  }

  /**
   * Downloads a blob with safety checks
   * @param {Blob} blob 
   * @param {string} filename 
   * @param {Object} options 
   */
  async downloadBlob(blob, filename, options = {}) {
    try {
      const url = URL.createObjectURL(blob);
      await this.triggerDownload(url, filename, options);
    } catch (error) {
      console.error('Blob download failed:', error);
      if (options.onError) {
        options.onError(error);
      }
    }
  }

  /**
   * Downloads text content as a file
   * @param {string} content 
   * @param {string} filename 
   * @param {string} mimeType 
   * @param {Object} options 
   */
  async downloadText(content, filename, mimeType = 'text/plain', options = {}) {
    const blob = new Blob([content], { type: mimeType });
    await this.downloadBlob(blob, filename, options);
  }

  /**
   * Downloads JSON data
   * @param {Object} data 
   * @param {string} filename 
   * @param {Object} options 
   */
  async downloadJSON(data, filename, options = {}) {
    const content = JSON.stringify(data, null, 2);
    await this.downloadText(content, filename, 'application/json', options);
  }

  /**
   * Downloads CSV data
   * @param {string} csvContent 
   * @param {string} filename 
   * @param {Object} options 
   */
  async downloadCSV(csvContent, filename, options = {}) {
    await this.downloadText(csvContent, filename, 'text/csv', options);
  }

  /**
   * Downloads SVG content
   * @param {string} svgContent 
   * @param {string} filename 
   * @param {Object} options 
   */
  async downloadSVG(svgContent, filename, options = {}) {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    await this.downloadBlob(blob, filename, options);
  }

  /**
   * Clears all timeouts
   */
  clearTimeouts() {
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout);
    }
    this.timeouts.clear();
  }

  /**
   * Cleans up all active downloads and marks manager as destroyed
   */
  destroy() {
    this.isDestroyed = true;
    
    // Clear all timeouts
    this.clearTimeouts();
    
    // Remove all active links
    for (const link of this.activeLinks) {
      this.safeRemoveElement(link);
    }
    
    this.activeLinks.clear();
  }
}

// Global instance for convenience
let globalManager = null;

/**
 * Gets or creates the global download manager
 * @returns {SafeDownloadManager}
 */
function getGlobalManager() {
  if (!globalManager) {
    globalManager = new SafeDownloadManager();
  }
  return globalManager;
}

/**
 * Convenience function for blob downloads
 * @param {Blob} blob 
 * @param {string} filename 
 * @param {Object} options 
 */
export async function downloadBlob(blob, filename, options = {}) {
  const manager = getGlobalManager();
  await manager.downloadBlob(blob, filename, options);
}

/**
 * Convenience function for text downloads
 * @param {string} content 
 * @param {string} filename 
 * @param {string} mimeType 
 * @param {Object} options 
 */
export async function downloadText(content, filename, mimeType = 'text/plain', options = {}) {
  const manager = getGlobalManager();
  await manager.downloadText(content, filename, mimeType, options);
}

/**
 * Convenience function for JSON downloads
 * @param {Object} data 
 * @param {string} filename 
 * @param {Object} options 
 */
export async function downloadJSON(data, filename, options = {}) {
  const manager = getGlobalManager();
  await manager.downloadJSON(data, filename, options);
}

/**
 * Convenience function for CSV downloads
 * @param {string} csvContent 
 * @param {string} filename 
 * @param {Object} options 
 */
export async function downloadCSV(csvContent, filename, options = {}) {
  const manager = getGlobalManager();
  await manager.downloadCSV(csvContent, filename, options);
}

/**
 * Convenience function for SVG downloads
 * @param {string} svgContent 
 * @param {string} filename 
 * @param {Object} options 
 */
export async function downloadSVG(svgContent, filename, options = {}) {
  const manager = getGlobalManager();
  await manager.downloadSVG(svgContent, filename, options);
}

/**
 * React hook for safe downloads with automatic cleanup
 * @returns {Object} Download functions
 */
export function useSafeDownload() {
  const managerRef = useRef(null);

  useEffect(() => {
    // Create a dedicated manager for this component
    managerRef.current = new SafeDownloadManager();

    // Cleanup on unmount
    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
    };
  }, []);

  return {
    downloadBlob: (blob, filename, options) => 
      managerRef.current?.downloadBlob(blob, filename, options),
    downloadText: (content, filename, mimeType, options) => 
      managerRef.current?.downloadText(content, filename, mimeType, options),
    downloadJSON: (data, filename, options) => 
      managerRef.current?.downloadJSON(data, filename, options),
    downloadCSV: (csvContent, filename, options) => 
      managerRef.current?.downloadCSV(csvContent, filename, options),
    downloadSVG: (svgContent, filename, options) => 
      managerRef.current?.downloadSVG(svgContent, filename, options),
  };
}

export default SafeDownloadManager;