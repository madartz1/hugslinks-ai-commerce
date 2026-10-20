// Intentionally disabled until supplier SKUs, real stock, price verification,
// secure order database, Stripe webhook and idempotent fulfillment are tested.
export default async function handler(){
 return new Response(JSON.stringify({error:"LUXE checkout is not enabled",code:"LUXE_NOT_READY"}),{status:503,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
}