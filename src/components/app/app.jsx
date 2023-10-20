import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
//import { data as ingredients } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//import { orderIngredients } from "../../utils/order";
import { useEffect, useState } from "react";
import { getIngredients } from "../../api/api";


function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default App;
