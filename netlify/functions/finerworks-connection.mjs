import { timingSafeEqual } from "node:crypto";
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const equal=(a,b)=>{const x=Buffer.from(a||""),y=Buffer.from(b||"");return x.length===y.length&&x.length>0&&timingSafeEqual(x,y)};
export default async function handler(request){
 if(request.method!=="POST")return reply({error:"Method not allowed"},405);
 const gate=process.env.HUGS_COMMERCE_ADMIN_TEST_TOKEN;
 if(!gate||!equal(request.headers.get("x-hugs-admin-test-token"),gate))return reply({error:"Unauthorized"},401);
 const webKey=process.env.FINERWORKS_WEB_API_KEY,appKey=process.env.FINERWORKS_APP_KEY,sku=process.env.FINERWORKS_TEST_SKU || "AP6543P49875";
 if(!webKey||!appKey)return reply({configured:false,connected:false,reason:"Credentials not configured"},503);

 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
 try{
  const response=await fetch("https://v2.api.finerworks.com/v3/get_product_details",{method:"POST",headers:{"Content-Type":"application/json","web_api_key":webKey,"app_key":appKey},body:JSON.stringify([{product_order_po:null,product_qty:1,product_sku:sku}]),signal:controller.signal});
  const data=await response.json().catch(()=>null);
  return reply({configured:true,connected:response.ok&&data?.status?.success===true,httpStatus:response.status,supplierStatusCode:data?.status?.status_code??null,testOnly:true,usedDocumentationExample:!process.env.FINERWORKS_TEST_SKU},response.ok?200:502);
 }catch(e){return reply({configured:true,connected:false,reason:e?.name==="AbortError"?"Timeout":"Network or supplier error"},502)}
 finally{clearTimeout(timer)}
}