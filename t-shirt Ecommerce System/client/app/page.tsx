import "./globals.css";
export default function Home() {
  return (
    <>
      <section className="p-5">
        <div className="container-fluid">
          <div className="carousel">
            <div className="carousel">
              <div className="carousel-track">
                <div className="slide">
                  <img src="/home/tshirt1.png" />
                </div>
                <div className="slide active">
                  <img src="/home/tshirt1.png" />
                </div>
                <div className="slide">
                  <img src="/home/tshirt1.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
