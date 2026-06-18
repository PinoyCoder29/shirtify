"use client";
import Button from "@/components/ui/Button/Button";
import { verifyOtp } from "@/services/auth.service";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./style.module.css";
export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = sessionStorage.getItem("verify_email");

    if (!email) {
      toast.error("Email not found!");
      return;
    }
    if (otp.length !== 6) {
      toast.error("OTP must be a 6 digits.");
      return;
    }
    try {
      const res = await verifyOtp({
        email,
        otp,
      });
      if (!res) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      sessionStorage.removeItem("verify_email");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <section className=" d-flex align-items-center justify-content-center p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className={` p-4 bg-white text-center ${styles.otpContent}`}>
                <header>
                  <h3 className="fw-bold">Enter OTP code</h3>

                  <p className="text-muted">
                    A 6-digit OTP has been sent to your email. Enter it below to
                    verify your account.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      maxLength={6}
                      className="form-control text-center mb-3"
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <Button type="submit" className={styles.otpButton}>
                      {loading ? "Loading..." : "Continue"}
                    </Button>
                    <p>
                      Didn't get OTP?<span className="fw-bold">Resend OTP</span>
                    </p>
                  </form>
                </header>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
