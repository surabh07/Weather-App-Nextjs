"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "favourite-cities";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  // Persist whenever favourites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (city: string) => {
    if (!favourites.includes(city)) {
      setFavourites([...favourites, city]);
    }
  };

  const removeFavourite = (city: string) => {
    setFavourites(favourites.filter(c => c !== city));
  };

  return {
    favourites,
    addFavourite,
    removeFavourite,
  };
}
