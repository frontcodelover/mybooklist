import Nav from "./nav";
import NavResponsive from "./navResponsive";
// import Footer from "./footer";

//* Layout commun à tout le site

export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto">

      <NavResponsive />
      <Nav />

      <main>{children}</main>
      {/* <Footer /> */}
      </div>
    </>
  );
}
