"use client";
import Button from "@/components/ui/Button/Button";
import styles from "./style.module.css";
import React, { FormEvent, useState } from "react";
import { register } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      sessionStorage.setItem("verify_email", form.email);
      router.push("/verify-otp");
    } catch (error) {
      setLoading(false);
      toast.error("server error.");
    }
  };

  return (
    <section className={styles.authSection}>
      <div className="container">
        <div className="row justify-content-center min-vh-100 py-5">
          {/* MAIN CARD */}
          <div className="col-lg-8 col-md-10 px-5 px-md-0">
            <div className={`row ${styles.authCard}`}>
              {/* LEFT SIDE */}
              <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-4">
                <div className={styles.leftContent}>
                  <h2>Shirtify</h2>

                  <p className="mt-2">Welcome to Shirtify</p>

                  <span>
                    Discover premium streetwear and exclusive t-shirt designs
                    made for your everyday style.
                  </span>

                  <ul className="mt-4">
                    <li>Premium quality shirts</li>
                    <li>Exclusive drops</li>
                    <li>Fast checkout</li>
                    <li>Secure payments</li>
                  </ul>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-md-6 col-12 p-4">
                <div className={styles.rightContent}>
                  <h4>Create Account</h4>

                  <p className="text-muted">
                    Sign up to start your fashion journey
                  </p>

                  <form className="mt-3" onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-3"
                      placeholder="Full Name"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    <input
                      className="form-control mb-3"
                      type="email"
                      value={form.email}
                      name="email"
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <input
                      className="form-control mb-3"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                    />

                    <Button className="w-100" type="submit">
                      {loading ? "Sending Otp..." : "Sign Up"}
                    </Button>
                  </form>

                  <small className="d-block mt-3">
                    Already have an account? Login
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
