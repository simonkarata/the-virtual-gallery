'use client';

import { useEffect, useRef, useState } from 'react';
import modelMap from '@/utils/modelMap';
import { useGalleryContext } from '@/context/GalleryContext';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function GalleryInput({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { selectedGallery, setSelectedGallery } = useGalleryContext();

  useEffect(() => {
    if (selectedGallery) {
      setInputValue(selectedGallery.title);
      onChange(selectedGallery.title);
      setSuggestions([]);
    }
  }, [selectedGallery]);

  const allSlugs = Object.keys(modelMap);

  const validateInput = (input: string) => {
    const normalized = input.toLowerCase().trim();
    const slugMatch = allSlugs.find((slug) => slug === normalized);
    const titleMatch = Object.entries(modelMap).find(
      ([, data]) => data.title?.toLowerCase().trim() === normalized
    );

    if (slugMatch) {
      setSuggestions([]);
      setSelectedGallery(modelMap[slugMatch]);
      onChange(modelMap[slugMatch].title);
    } else if (titleMatch) {
      setSuggestions([]);
      setSelectedGallery(titleMatch[1]);
      onChange(titleMatch[1].title);
    } else {
      const filteredSuggestions = Object.values(modelMap)
        .map((data) => data.title)
        .filter((title) =>
          title?.toLowerCase().startsWith(normalized)
        )
        .slice(0, 5) as string[];

      setSuggestions(filteredSuggestions);
      onChange('');
    }
  };

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      validateInput(inputValue);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputValue]);

  const handleSuggestionClick = (title: string) => {
    setInputValue(title);
    setSuggestions([]);
    const match = Object.values(modelMap).find(
      (data) => data.title?.toLowerCase().trim() === title.toLowerCase().trim()
    );
    if (match) {
      setSelectedGallery(match);
      onChange(match.title);
    }
  };

  const handleSelect = () => {
    // Clear input content on any selection
    setInputValue('');
    setSuggestions([]);
    onChange('');
  };

  return (
    <div className="relative flex flex-col gap-1  max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onClick={handleSelect}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
        placeholder={isFocused || value ? '' : 'Search exhibitions...'}
        className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        size={30}
        aria-label="Search gallery"
        autoComplete="off"
      />
      {suggestions.length > 0 && isFocused && (
        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {suggestions.map((title) => (
            <li
              key={title}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm text-gray-800"
              onClick={() => handleSuggestionClick(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
