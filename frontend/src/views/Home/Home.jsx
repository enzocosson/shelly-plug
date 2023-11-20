import styles from "./Home.module.scss";
import TurnPower from "../../componant/TurnPowerCloud";

function Home() {
  return (
    <>
      <div className={styles.main}>
        <TurnPower />
        <div className={styles.navbar}>
          <h2>Dashboard</h2>
          <div class={styles.search__container}>
            <label for="searchInput">
              <svg
                width="24"
                height="24"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class={styles.search__icon}
              >
                <path
                  d="M50 44H46.84L45.72 42.92C49.64 38.36 52 32.44 52 26C52 11.64 40.36 0 26 0C11.64 0 0 11.64 0 26C0 40.36 11.64 52 26 52C32.44 52 38.36 49.64 42.92 45.72L44 46.84V50L64 69.96L69.96 64L50 44ZM26 44C16.04 44 8 35.96 8 26C8 16.04 16.04 8 26 8C35.96 8 44 16.04 44 26C44 35.96 35.96 44 26 44Z"
                  fill="white"
                />
              </svg>
            </label>
            <input
              type="text"
              id="searchInput"
              placeholder="Search something..."
              class={styles.search__input}
            />
          </div>
          <div className={styles.interaction}>
            <button className={styles.upgrade__button}>Upgrade</button>
            <button className={styles.notif__button}>
              {" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#f9f9f9"
                xmlns="http://www.w3.org/2000/svg"
                class="ltr-4z3qvp e1svuwfo1"
                data-name="Bell"
                aria-hidden="true"
                className={styles.notif__icon}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                  fill="#f9f9f9"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.container__cards}>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>

        </div>
      </div>
    </>
  );
}

export default Home;
