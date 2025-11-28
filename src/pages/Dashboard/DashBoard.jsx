import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductGrid from '../../components/Cards/ProductGrid';
import Greeting from "../../components/Greeting/Greeting";
function DashBoard() {
    return (
        <div className="DashBoard">
            <Header />
            <Greeting />
            <ProductGrid />
            <Footer />
        </div>
    );
}

export default DashBoard