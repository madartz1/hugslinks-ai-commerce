import products from "../../data/products.json" with { type: "json" };

export default async () => new Response(JSON.stringify({
  demo: true,
  source: "LOCAL DEMONSTRATION DATA — not live market research",
  products: products.map(p=>({...p, projectedGrossProfit:Number((p.price-p.supplierCost-p.shipping).toFixed(2))}))
}), {headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
