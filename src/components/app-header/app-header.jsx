import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader () {
    return (
        <header className={styles.header}>
            <nav className="content-container pt-4 pb-4">
              <section className={styles.content}>
                <ul className={`${styles.list} pl-5`}>
                    <li className={styles.listItem && "pr-10"}>
                        <a href="#" className={styles.link}>
                          <BurgerIcon type="primary" />
                          <p className="text text_type_main-default pl-2">Конструктор</p>
                        </a>
                    </li>
                    <li className={styles.listItem && "pr-10"}>
                        <a href="#" className={styles.link}>
                          <ListIcon type="secondary" />
                          <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                        </a>
                    </li>
                </ul>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <ul className={`${styles.list} pr-6`}>
                   <li className={styles.listItem}>
                      <a href="#" className={styles.link}>
                      <ProfileIcon type="secondary" />
                      <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
                      </a>
                    </li> 
                </ul>
              </section>
            </nav>
        </header>
    );
};

export default AppHeader;