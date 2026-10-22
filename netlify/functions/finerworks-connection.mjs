import { timingSafeEqual } from "node:crypto";
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const equal=(a,b)=>{const x=Buffer.from(a||""),y=Buffer.from(b||"");return x.length===y.length&&x.length>0&&timingSafeEqual(x,y)};
const classify=(http,data)=>{
 if(http===401||http===403)return "supplier_authentication_rejected";
 if(http===404)return "supplier_endpoint_not_found";
 if(http===408||http===429)return "supplier_temporarily_unavailable";
 if(http>=500)return "supplier_server_error";
 const message=String(data?.status?.message||data?.message||"").toLowerCase();
 if(/sku|product|catalog|item/.test(message))return "supplier_product_or_sku_error";
 if(/auth|key|credential|permission/.test(message))return "supplier_authentication_rejected";
 if(http>=400)return "supplier_request_rejected";
 return "supplier_response_unconfirmed";
};
export default async function handler(request){
 if(request.method!=="POST")return reply({error:"Method not allowed"},405);
 const gate=process.env.HUGS_COMMERCE_ADMIN_TEST_TOKEN;
 if(!gate||!equal(request.headers.get("x-hugs-admin-test-token"),gate))return reply({error:"Unauthorized"},401);
 const webKey=process.env.FINERWORKS_WEB_API_KEY,appKey=process.env.FINERWORKS_APP_KEY;
 const sku=process.env.FINERWORKS_TEST_SKU || "AP6543P49875";
 if(!webKey||!appKey)return reply({configured:false,connected:false,errorCategory:"credentials_not_configured",testOnly:true},503);
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
 try{
  const response=await fetch("https://v2.api.finerworks.com/v3/get_product_details",{
   method:"POST",headers:{"Content-Type":"application/json","web_api_key":webKey,"app_key":appKey},
   body:JSON.stringify([{product_order_po:null,product_qty:1,product_sku:sku}]),signal:controller.signal
  });
  const raw=await response.text();
  let data=null;try{data=JSON.parse(raw)}catch{}
  const supplierSuccess=data?.status?.success===true;
  const connected=response.ok&&supplierSuccess;
  // Never return raw supplier responses: they could include account or pricing data.
  const responseType=data?"json":raw.trim().startsWith("<")?"html":"other";
  return reply({
   configured:true,connected,testOnly:true,supplierHttpStatus:response.status,
   supplierStatusCode:typeof data?.status?.status_code==="number"?data.status.status_code:null,
   responseType,usedDocumentationExample:!process.env.FINERWORKS_TEST_SKU,
   errorCategory:connected?null:classify(response.status,data),
   nextStep:connected?"Supplier product detail request accepted":
    response.status>=500?"Check FinerWorks service status, endpoint and supplier logs":
    "Verify FinerWorks credentials, API endpoint, and test SKU"
  },connected?200:502);
 }catch(e){
  return reply({configured:true,connected:false,testOnly:true,errorCategory:e?.name==="AbortError"?"supplier_timeout":"supplier_network_error"},502);
 }finally{clearTimeout(timer)}
}