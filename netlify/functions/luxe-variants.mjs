import data from "../../data/luxe-print-variants.json" with {type:"json"};
export default async function handler(){
 return new Response(JSON.stringify({currency:data.currency,verified:false,checkoutEnabled:false,variants:data.variants.map(v=>({id:v.id,medium:v.medium,size:v.size,retailTarget:v.retailTarget,available:false}))}),{status:200,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
}