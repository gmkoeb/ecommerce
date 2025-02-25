import ProductDetails from "./product-details"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return(
    <>
     <ProductDetails id={id}/>
    </>
  )
}