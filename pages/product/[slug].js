import React, { useState } from "react";
import { urlFor } from "../../lib/client";
import { client } from "../../lib/client";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai";
import Product from "../../components/Product";

const ProductDetails = ({ product, products }) => {
    const { image, name, description, price } = product;

    const [index, setIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[0])} alt="" className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {image?.map((img, idx) => (
                            <img key={index} src={urlFor(img)} alt="" className={idx === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(idx)} />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{description}</p>
                    <p className="price">{price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={() => {
                                quantity > 1 && setQuantity(quantity - 1)
                            }}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num" >
                                {quantity}
                            </span>
                            <span className="plus" onClick={() => setQuantity(quantity + 1)}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick="">Add to cart</button>
                        <button type="button" className="buy-now">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may like too</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products?.map((product, index) => (
                            <Product key={index} product={product} />
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map(product => ({
        params: {
            slug: product.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
        props: { products, product },
    };
};
export default ProductDetails;
