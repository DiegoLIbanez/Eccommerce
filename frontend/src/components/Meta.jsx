import { Helmet } from "react-helmet-async"

const Meta = ( { title, decription, keywords } ) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={decription} />
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to ProShop",
    decription: "We sell the best products for cheap",
    keywords: "electronics, buy electronics, cheap electronics"
}

export default Meta
 