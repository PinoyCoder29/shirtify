import styles from "./style.module.css";
export default function Header() {
  return (
    <header className={styles.adminHeader}>
      <div className="container">
        <div className="d-flex">
          <div className="ms-auto flex-row d-flex gap-4 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
            <i className="bi bi-cart"></i>
            <i className="bi bi-bell"></i>
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
