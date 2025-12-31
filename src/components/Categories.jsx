import { NavLink } from "react-router-dom";
import styles from "./Categories.module.css";
import { useCategories } from "../context/CategoriesContext";

function Categories() {
  const { categories } = useCategories();

  return (
    <nav className={styles["header-nav"]}>
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          to={`/categories/${category.slug}`}
          className={({ isActive }) => 
            `${styles["header-nav-link"]} ${isActive ? styles["header-nav-link--active"] : ""}`
          }
        >
          {({ isActive }) => (
            <span data-testid={isActive ? "active-category-link" : "category-link"}>
              {category.name}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default Categories;
