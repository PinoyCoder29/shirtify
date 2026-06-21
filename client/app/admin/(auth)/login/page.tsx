import Button from "@/components/ui/Button/Button";
import styles from "./style.module.css";
export default function Login() {
  return (
    <main className={styles.adminSection}>
      <div className="container">
        <div className="row  d-flex justify-content-center ">
          <div className="col-md-6">
            <div className={`${styles.loginContent}`}>
              <h4 className="text-center">Welcome back Admin</h4>
              <form action="">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                />
                <Button className="w-100 mb-3">Login</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
