"use client";

interface SearchBarProps {
  location: string;
  onLocationChange: (value: string) => void;
}

export default function SearchBar({
  location,
  onLocationChange,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for a city"
        value={location}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl bg-[#0f1724] text-sm md:text-base outline-none"/>
    </div>
  );
}
