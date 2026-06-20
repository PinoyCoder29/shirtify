"use client";
import Button from "@/components/ui/Button/Button";
import { login } from "@/services/auth.service";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await login(form);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("server error.");
    }
  };
  return (
    <main>
      <section className="p-5">
        <div className="container">
          <div className="row justify-content-center align-items-center ">
            {/* THIS CONTROLS WIDTH */}
            <div className={`col-md-8 ${styles.loginContent}`}>
              <div className="row align-items-center">
                {/* left SIDE */}
                <div className="col-md-6">
                  <header>
                    <h1>Shirtify</h1>
                    <p>
                      Your one-stop shop for premium oversized shirts and
                      streetwear styles.
                    </p>
                  </header>

                  <p>
                    Discover high-quality designs, modern fashion, and exclusive
                    drops.
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-6 shadow p-4">
                  <header>
                    <h2>Sign In</h2>
                    <p>Welcome back to Shirtify</p>
                  </header>

                  <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={form.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>

                    <Button className=" w-100" type="submit">
                      {loading ? "Loading..." : "Login"}
                    </Button>
                  </form>

                  <footer className="mt-3">
                    <small>
                      Don't have an account? <a href="/signUp">Sign up</a>
                    </small>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
