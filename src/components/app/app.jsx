import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
//import { data as ingredients } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//import { orderIngredients } from "../../utils/order";
import { useCallback, useEffect, useState } from "react";
import { getIngredients } from "../../api/api";
import Modal from "../modal/modal";
import { data } from "../../utils/data";

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

  const [isModalActive, setIsModalActive] = useState(false)
  const [isModal, setIsModal] = useState();

  const handleOpenModal = useCallback((content) => {
    setIsModal(content);
    setIsModalActive(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalActive(false);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        <BurgerIngredients ingredients={ingredients}
        handleOpenModal={handleOpenModal} />
        <BurgerConstructor ingredients={orderIngredients}
        handleOpenModal={handleOpenModal} />
        {isModalActive &&
          (<Modal onClose={handleCloseModal}>
            {isModal}
          </Modal>)
        }
      </main>
    </div>
  );
};

export default App;
