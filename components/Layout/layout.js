import Nav from "./nav";
import NavResponsive from "./navResponsive";
// import Footer from "./footer";

//* Layout commun à tout le site

export default function Layout({ children }) {
  return (
    <>
      <div className="mx-auto">
        <div className="max-w-screen-xl mx-auto">
          <NavResponsive />
        </div>

        {/* <Nav /> */}

        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
