import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";


import './App.css';



function App() {


    const [products, setproducts] = useState([]);
    const [isloading, setisloading] = useState(true);
    const [error, seterror] = useState(null);
    const [search, setsearch] = useState("")
    const [submit, setsubmit] = useState("")

    function handleSearch(e) {
        e.preventDefault();
        setsubmit(search);
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${submit}`).then((response) => {
            if (!response.ok) throw new Error('server error!')
            return response.json();
        }).then((data) => {
            setproducts(data.products)
            setisloading(false)
        }).catch((error) => {
            seterror(error.message)
            setisloading(false)
        })
    }, [submit])

    function back() {
        setsearch("")
        setsubmit("")
    }

    return (
        <>
            <nav>
                <button className="back" onClick={back}>
                    back
                </button>
                <div className="container">
                    <div className="logo">
                        <h3>Trendify</h3>
                    </div>
                    <form onSubmit={handleSearch}>
                        <input type="text" className="input-search" placeholder="search" name="search" value={search} onChange={(e) => setsearch(e.target.value)}/>

                        <button type="submit" className="input-button" name="search" >search</button>

                    </form>
                </div>

            </nav>
            <main>
                {isloading ? (
                    <p>Content is loading <ClipLoader color="#ffffff" /></p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="products-container">
                        {products.map((product) => (
                            <div className="product-card" key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>Price: ${product.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    )

};
// {isloading ? (
//                     <p>contect is loading <ClipLoader color="#ffffff" /></p> )
//                 : (<h1>loaded</h1>)}
export default App;