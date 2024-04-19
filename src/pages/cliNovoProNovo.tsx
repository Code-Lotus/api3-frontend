import { Link }    from "react-router-dom";
import Navbar from "../components/navbar";

export default function CliNovoProNovo(){
    return(
        <>
            <Navbar />
            <p>Hello World!</p>
            <Link to="../app">Home</Link>
        </>
    );
}
