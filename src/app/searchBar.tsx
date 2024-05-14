// searchBar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SearchBar = () => {
  return (
    <div className="flex items-center max-w-xl">
      <div className="relative w-full">
        <input
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-metrics placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="Search"
          type="search"
          name="search"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {/* Utiliza la imagen del icono de búsqueda de tu carpeta pública */}
          <img
            src="images/SearchIcon.svg" // Asegúrate de que la ruta sea correcta
            className="h-5 w-5" // Ajusta el tamaño según tus necesidades
            alt="Search"
          />
        </div>
      </div>
      <div className="flex pl-16">
        <Link href="/Profile">
          <Button className="bg-blue hover:bg-blue-dark text-blue-dark hover:text-white font-bold text-base">
            My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
