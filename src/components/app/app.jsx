import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
//import { data as ingredients } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { orderIngredients } from "../../utils/order";
import { useEffect, useState } from "react";
import { getInitialIngredients } from "../../api/api";


function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getInitialIngredients = async () => {
      const data = await res.json();
      setIngredients({ data: data.getInitialIngredients });
    }
    getInitialIngredients();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        <BurgerIngredients ingredients={ingredients}
        handleOpenModal={handleOpenModal} />
        <BurgerConstructor ingredients={orderIngredients}
        handleOpenModal={handleOpenModal} />
      </main>
    </div>
  );
}

export default App;
