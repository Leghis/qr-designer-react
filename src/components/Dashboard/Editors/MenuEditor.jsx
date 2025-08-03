import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, Image, Euro } from 'lucide-react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const MenuEditor = ({ data, onChange, onPreviewUpdate }) => {
  const [menu, setMenu] = useState({
    restaurantName: data.restaurantName || '',
    description: data.description || '',
    categories: data.categories || [
      {
        id: '1',
        name: 'Entrées',
        items: []
      }
    ]
  });

  useEffect(() => {
    // Generate menu URL for QR code
    const menuId = Date.now().toString();
    const menuUrl = `https://qr-designer.com/menu/${menuId}`;
    onPreviewUpdate(menuUrl);
    
    // Update parent data
    onChange({
      ...menu,
      menuId,
      menuUrl
    });
  }, [menu, onChange, onPreviewUpdate]);

  const addCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: 'Nouvelle catégorie',
      items: []
    };
    setMenu(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const updateCategory = (categoryId, updates) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    }));
  };

  const deleteCategory = (categoryId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
  };

  const addItem = (categoryId) => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      image: null
    };
    
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    }));
  };

  const updateItem = (categoryId, itemId, updates) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, ...updates } : item
              )
            }
          : cat
      )
    }));
  };

  const deleteItem = (categoryId, itemId) => {
    setMenu(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Restaurant Info */}
      <div className="space-y-4">
        <Input
          label="Nom du restaurant"
          placeholder="La Bonne Table"
          value={menu.restaurantName}
          onChange={(e) => setMenu(prev => ({ ...prev, restaurantName: e.target.value }))}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={menu.description}
            onChange={(e) => setMenu(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Cuisine traditionnelle française..."
            rows={3}
            className="w-full px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Catégories
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={addCategory}
          >
            <Plus className="w-4 h-4 mr-1" />
            Ajouter une catégorie
          </Button>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {menu.categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-50 dark:bg-dark-800 rounded-xl p-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <Input
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                    placeholder="Nom de la catégorie"
                    className="flex-1"
                  />
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Items */}
                <div className="space-y-3 ml-8">
                  {category.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-dark-700 rounded-lg p-3 space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="flex-1 space-y-3">
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(category.id, item.id, { name: e.target.value })}
                            placeholder="Nom du plat"
                          />
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(category.id, item.id, { description: e.target.value })}
                            placeholder="Description (optionnel)"
                            rows={2}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </div>
                        <div className="w-24">
                          <div className="relative">
                            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => updateItem(category.id, item.id, { price: e.target.value })}
                              placeholder="0.00"
                              className="w-full pl-8 pr-3 py-2 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 transition-all"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => deleteItem(category.id, item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  <button
                    onClick={() => addItem(category.id)}
                    className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Ajouter un plat
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Votre menu sera accessible via un lien unique. Les clients pourront scanner le QR code pour voir le menu sur leur téléphone.
        </p>
      </div>
    </div>
  );
};

export default MenuEditor;