import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
