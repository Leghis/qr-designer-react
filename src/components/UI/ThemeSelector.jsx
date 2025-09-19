import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

const ThemeSelector = ({ variant = 'inline', className }) => {
  const { availableThemes, currentTheme, setTheme, theme: activeThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const isFloating = variant === 'floating';

  const sortedThemes = useMemo(() => availableThemes ?? [], [availableThemes]);
  const buttonShadow = isFloating
    ? '0 28px 52px -28px var(--brand-glow, var(--shadow-strong))'
    : '0 18px 36px -28px var(--shadow-soft)';
  const dropdownShadow = isFloating
    ? '0 36px 68px -42px var(--brand-glow, var(--overlay))'
    : '0 28px 60px -40px var(--overlay)';
  const isExpanded = !isFloating || isHovering || isOpen;
  const floatingSpacingClasses = isFloating
    ? (isExpanded ? 'gap-3 px-4 sm:px-5' : 'gap-1 px-3 sm:px-3')
    : 'gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5';

  useEffect(() => {
    if (!isFloating) return;

    if (isOpen) {
      setIsHovering(true);
      return;
    }

    const buttonEl = buttonRef.current;
    if (!buttonEl) {
      setIsHovering(false);
      return;
    }

    if (!buttonEl.matches(':hover') && !buttonEl.matches(':focus-within')) {
      setIsHovering(false);
    }
  }, [isFloating, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleThemeChange = (id) => {
    setTheme(id);
    setIsOpen(false);
  };

  const currentIcon = currentTheme?.icon ?? '🎨';
  const showDetails = !isFloating || isExpanded;
  const buttonMotionProps = isFloating
    ? { layout: true, initial: false, transition: { type: 'spring', stiffness: 260, damping: 24 } }
    : {};

  const handleMouseEnter = () => {
    if (!isFloating) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isFloating) return;
    if (!isOpen) {
      setIsHovering(false);
    }
  };

  const handleFocus = () => {
    if (!isFloating) return;
    setIsHovering(true);
  };

  const handleBlur = (event) => {
    if (!isFloating) return;
    if (isOpen) return;
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsHovering(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        isFloating
          ? 'fixed right-4 sm:right-6 z-[70] bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]'
          : 'relative',
        className
      )}
    >
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          'flex items-center rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          isFloating
            ? cn('py-3 shadow-xl hover:shadow-2xl hover:-translate-y-1', floatingSpacingClasses)
            : floatingSpacingClasses
        )}
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          borderColor: 'var(--brand-border, var(--border-primary))',
          boxShadow: buttonShadow,
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Choisir un thème"
        {...buttonMotionProps}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl text-lg shadow-inner" style={{
          background: 'linear-gradient(135deg, var(--color-primary-500-hex, #3b82f6), var(--color-accent-500-hex, #8b5cf6))',
          boxShadow: '0 8px 16px -12px var(--shadow-strong)'
        }}>
          {currentIcon}
        </span>
        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              key="details-desktop"
              className="hidden sm:flex flex-col items-start leading-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {currentTheme?.name ?? 'Thème'}
              </span>
              <span className="text-xs text-opacity-80" style={{ color: 'var(--text-tertiary)' }}>
                {currentTheme?.description ?? 'Personnalisez votre ambiance'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              key="details-mobile"
              className="flex sm:hidden text-sm font-semibold"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              style={{ color: 'var(--text-primary)' }}
            >
              {currentTheme?.name ?? 'Thème'}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={cn(
            'flex items-center gap-2 text-sm text-opacity-70 transition-all duration-200',
            isFloating && !isExpanded ? 'ml-1 gap-1' : 'ml-auto'
          )}
          style={{ color: 'var(--text-tertiary)' }}
        >
          <AnimatePresence initial={false}>
            {(!isFloating || isExpanded) && (
              <motion.span
                key="palette-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Palette className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isFloating ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isFloating ? 8 : -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute right-0 z-[60] w-[320px] sm:w-[360px]',
              isFloating ? 'bottom-full mb-3' : 'mt-3'
            )}
          >
            <div
              className="rounded-3xl border backdrop-blur-xl p-4 shadow-2xl"
              style={{
                background: 'color-mix(in srgb, var(--bg-secondary) 92%, transparent)',
                borderColor: 'var(--brand-border, var(--border-primary))',
                boxShadow: dropdownShadow
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Choisissez votre ambiance
                </h3>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {sortedThemes.length} thèmes
                </span>
              </div>
              <div className="grid gap-3">
                {sortedThemes.map((themeOption) => {
                  const isActive = activeThemeId === themeOption.id;

                  return (
                    <motion.button
                      key={themeOption.id}
                      type="button"
                      onClick={() => handleThemeChange(themeOption.id)}
                      className={cn(
                        'group w-full rounded-2xl border p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
                        isActive ? 'shadow-xl' : 'shadow-sm hover:-translate-y-0.5 hover:shadow-lg'
                      )}
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: isActive ? 'var(--brand-border, var(--color-primary-500-hex))' : 'color-mix(in srgb, var(--border-primary) 35%, transparent)',
                        color: 'var(--text-primary)',
                        boxShadow: isActive
                          ? '0 26px 52px -34px var(--brand-glow, var(--shadow-strong))'
                          : '0 18px 36px -32px var(--shadow-soft)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${themeOption.preview?.[0] ?? '#3b82f6'}, ${themeOption.preview?.[1] ?? '#8b5cf6'})`,
                            color: themeOption.isDark ? '#f8fafc' : '#0f172a',
                            boxShadow: '0 10px 18px -14px var(--shadow-strong)'
                          }}
                        >
                          {themeOption.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {themeOption.name}
                            </h4>
                            {isActive && (
                              <Check className="h-4 w-4 text-primary-500" aria-hidden="true" />
                            )}
                          </div>
                          <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {themeOption.description}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            {themeOption.preview?.slice(0, 4).map((color, index) => (
                              <span
                                key={`${themeOption.id}-preview-${color}-${index}`}
                                className="h-2.5 flex-1 rounded-full"
                                style={{
                                  background: color,
                                  boxShadow: '0 6px 16px -12px var(--shadow-soft)'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
