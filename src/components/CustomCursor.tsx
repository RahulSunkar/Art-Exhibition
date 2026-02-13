import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

interface CustomCursorProps {
  variant?: 'default' | 'large' | 'text' | 'image';
}

export function CustomCursor({ variant = 'default' }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, [cursorX, cursorY]);

  const getCursorSize = () => {
    switch (variant) {
      case 'large':
        return 60;
      case 'text':
        return 100;
      case 'image':
        return 80;
      default:
        return 40;
    }
  };

  const size = getCursorSize();

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: size,
            height: size,
            opacity: variant === 'default' ? 0.5 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-full h-full rounded-full border-2 border-white backdrop-blur-sm" />
          
          {variant === 'text' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold uppercase"
            >
              View
            </motion.div>
          )}
          
          {variant === 'image' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-white rounded-full" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
