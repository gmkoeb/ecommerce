import ProductDetails from "@/components/Product"

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