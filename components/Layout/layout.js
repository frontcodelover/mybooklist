import Nav from "./nav";
// import Footer from "./footer";

//* Layout commun à tout le site

export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto">

      <Nav />
      <main>{children}</main>
      {/* <Footer /> */}
      </div>
    </>
  );
}
