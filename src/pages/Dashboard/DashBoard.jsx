import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductGrid from '../../components/Cards/ProductGrid';
function DashBoard() {
    return (
        <div className="DashBoard">
            <Header />
            <ProductGrid />
            <Footer />
        </div>
    );
}

export default DashBoard