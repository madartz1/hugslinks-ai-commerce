import products from "../../data/products.json" with { type: "json" };

export default async () => new Response(JSON.stringify({
  products: products.filter(p => p.status === "approved").map(({supplierCost,shipping,score,supplier,status,...publicFields}) => publicFields),
  demo: true,
  notice: "Seed catalog only; prices and stock are illustrative, orders are disabled."
}), {headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
