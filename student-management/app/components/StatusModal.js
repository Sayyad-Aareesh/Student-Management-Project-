'use client';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './statusModal.module.css';

export default function StatusModal({ isOpen, onClose, type, title, message }) {
  const isError = type === 'error';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose} 
        >
          <motion.div 
            className={`${styles.modalBox} ${isError ? styles.errorBorder : styles.successBorder}`}
            initial={{ scale: 0.8, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.8, y: 20 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className={styles.icon}>
              {isError ? '⚠️' : '✅'}
            </div>
            
            <h3 className={`${styles.title} ${isError ? styles.textError : styles.textSuccess}`}>
              {title}
            </h3>
            
            <p className={styles.message}>
              {message}
            </p>
            
            <button 
              onClick={onClose}
              className={`${styles.dismissBtn} ${isError ? styles.bgError : styles.bgSuccess}`}
            >
              Dismiss
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
