import Footer from "./footer";
import Nav from "./nav";

//*! Nee to fix footer display

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto mt-4 z-10">
          <Nav />
        </div>
        {children}
        <Footer />
      </div>
    </>
  );
}
