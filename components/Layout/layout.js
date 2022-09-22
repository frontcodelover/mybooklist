import Nav from "./nav";
import NavResponsive from "./navResponsive";
import Footer from "./footer";

//*! Nee to fix footer display

export default function Layout({ children }) {
  return (
    <>
  <div className="flex flex-col min-h-screen">
        <div className="container mx-auto">
          <NavResponsive />
        </div>

        {/* <Nav /> */}

        <main >{children}</main>
        <Footer />
      </div>
    </>
  );
}
