import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (!isOpen) return;
    
    // Save previous active element to restore later
    const previousFocus = document.activeElement;
    
    const focusableElementsString = 
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    
    let focusableElements = [];
    let firstTabStop = null;
    let lastTabStop = null;

    if (modalRef.current) {
      focusableElements = Array.from(modalRef.current.querySelectorAll(focusableElementsString));
      
      if (focusableElements.length > 0) {
        firstTabStop = focusableElements[0];
        lastTabStop = focusableElements[focusableElements.length - 1];
        // Focus first element when modal opens
        firstTabStop.focus();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else { // Tab
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (previousFocus) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-surface border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 id="modal-title" className="text-xl font-semibold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
