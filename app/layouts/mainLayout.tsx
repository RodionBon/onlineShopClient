import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/navBar";

export default function App() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}


