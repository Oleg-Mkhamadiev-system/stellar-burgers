import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
//import { data as ingredients } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//import { orderIngredients } from "../../utils/order";
import { useCallback, useEffect, useState } from "react";
import { getIngredients } from "../../api/api";


function App() {
  const [orderIngredients, setOrderIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setOrderIngredients(data.data)
    })
  }, []);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data.data);
    })
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={orderIngredients} />
      </main>
    </div>
  );
};

export default App;
