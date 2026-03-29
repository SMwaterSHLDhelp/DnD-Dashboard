import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for persistence with localStorage and auto-save functionality
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @param {object} options - Configuration options
 * @param {number} options.debounceDelay - Debounce delay for auto-save (default: 500ms)
 * @param {boolean} options.useIndexDB - Use IndexedDB instead of localStorage
 */
export function usePersistence(key, initialValue, options = {}) {
  const { debounceDelay = 500, useIndexedDB = false } = options;

  const [data, setData] = useState(() => {
    try {
      const saved = useIndexedDB ? null : localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Save to localStorage (not IndexedDB yet - keeping it simple with localStorage for MVP)
  const saveData = useCallback((value) => {
    try {
      const valueToStore = typeof value === 'function' ? value(data) : value;
      setData(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }, [key, data]);

  // Debounced auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [data, key, debounceDelay]);

  // Load data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
  }, [key]);

  // Clear data
  const clearData = useCallback(() => {
    localStorage.removeItem(key);
    setData(typeof initialValue === 'function' ? initialValue() : initialValue);
  }, [key, initialValue]);

  return [data, saveData, clearData];
}
