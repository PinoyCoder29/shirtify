import styles from "./style.module.css";
export default function Header() {
  return (
    <header className="">
      <nav className={`navbar navbar-expand-md ${styles.headerContent}`}>
        <div className="container">
          <h1 className="navbar-brand">Shirtify</h1>
          <div className="mx-auto"></div>
          <div className="ms-auto ">
            <form
              action=""
              className="d-flex flex-row align-items-center gap-4"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <i className="bi bi-cart"></i>
              <i className="bi bi-bell"></i>
              <i className="bi bi-person-circle"></i>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
