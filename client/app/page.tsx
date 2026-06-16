import Button from "@/components/ui/Button/Button";

export default function Home() {
  return (
    <>
      <section className="p-5">
        <div className="cotainer-fluid">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div className="heroContent">
                <h1 className="heroTitle">
                  Wear Your Style. Own Your Identity.
                </h1>
                <p className="heroDesc">
                  Premium oversized t-shirts designed for comfort, confidence,
                  and everyday streetwear. Elevate your look with Shirtify.
                </p>
                <div className="heroButtons">
                  <Button className="me-2" to="/">
                    Shop Now
                  </Button>
                  <button className="btn btn-outline-dark">Explore</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img src="/home/heroImg.png" alt="heroimg " />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
