import Nav from "./nav";
import NavResponsive from "./navResponsive";
import Footer from "./footer";

//*! Nee to fix footer display

export default function Layout({ children }) {
  return (
    <>
      <div className="mx-auto">
        <div className="max-w-screen-xl mx-auto">
          <NavResponsive />
        </div>

        {/* <Nav /> */}

        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
