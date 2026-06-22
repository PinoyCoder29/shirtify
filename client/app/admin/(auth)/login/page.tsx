"use client";
import Button from "@/components/ui/Button/Button";
import styles from "./style.module.css";
import React, { use, useState } from "react";
import { adminLogin } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push("/admin/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("server error");
    }
  };
  return (
    <main className={styles.adminSection}>
      <div className="container">
        <div className="row  d-flex justify-content-center ">
          <div className="col-md-6">
            <div className={`${styles.loginContent}`}>
              <h4 className="text-center">Welcome back Admin</h4>
              <form action="" onSubmit={handlesubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handlechange}
                  />
                  <span className=" input-group-text mb-3">
                    <i className=" bi bi-envelope"></i>
                  </span>
                </div>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handlechange}
                  />

                  <span className="input-group-text">
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </span>
                </div>
                <Button className="w-100 mb-3" type="submit">
                  {loading ? "Loading..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
