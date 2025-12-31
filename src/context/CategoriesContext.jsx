import { createContext, useContext } from "react";
import { useCategories as useCategoriesQuery } from "../hooks/useCategories";

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  // Fetch categories from GraphQL
  const { categories: rawCategories, loading, error } = useCategoriesQuery();

  // Transform categories to include slug (use name as slug for routing)
  const categories = rawCategories.map((cat) => ({
    name: cat.name,
    slug: cat.name.toLowerCase(),
  }));

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined)
    throw new Error("Context was used outside CategoriesProvider");
  return context;
}

export { CategoriesProvider, useCategories };
