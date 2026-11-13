import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
export const runtime='nodejs';
const searches:Record<string,string>={
 'Staffing & Outsourcing':'("expanding customer support" OR "hiring customer service" OR "new contact center" OR "outsourcing customer service")',
 'Digital Marketing':'("launches new brand" OR "expanding marketing team" OR "opens new locations")',
 'Real Estate':'("new property development" OR "new apartment development" OR "property management expansion")',
 'HVAC':'("HVAC company expansion" OR "commercial HVAC project" OR "HVAC contractor hiring")',
 'Roofing':'("roofing company expansion" OR "commercial roofing contract" OR "roofing contractor hiring")',
 'Cleaning':'("cleaning company expansion" OR "commercial cleaning contract" OR "facility services expansion")',
 'Credit Repair':'("credit services expansion" OR "financial wellness partnership")'
};
function decode(value:string){return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')}
function tag(item:string,name:string){const m=item.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'));return m?decode(m[1]).trim():''}
export async function GET(req:NextRequest){
 const auth=req.headers.get('authorization')||'';
 const token=auth.startsWith('Bearer ')?auth.slice(7):'';
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key||!token)return NextResponse.json({error:'Sign in to search for leads.'},{status:401});
 const sb=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user},error}=await sb.auth.getUser(token);
 if(error||!user)return NextResponse.json({error:'Your session expired. Please sign in again.'},{status:401});
 const industry=(req.nextUrl.searchParams.get('industry')||'Staffing & Outsourcing').slice(0,100);
 const region=(req.nextUrl.searchParams.get('region')||'United States').replace(/[^\p{L}\p{N} ,.-]/gu,'').slice(0,60);
 const custom=(req.nextUrl.searchParams.get('keywords')||'').replace(/[^\p{L}\p{N} ,.-]/gu,'').trim().slice(0,90);
 const phrase=custom||searches[industry]||('"' + industry.replace(/[^\p{L}\p{N} &-]/gu,'') + ' company expansion"');
 const query=phrase+' '+region+' when:30d';
 const rss='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=en-US&gl=US&ceid=US:en';
 try{
 const res=await fetch(rss,{signal:AbortSignal.timeout(9000),headers:{'User-Agent':'AILeadEngine/1.0'},next:{revalidate:900}});
 if(!res.ok)throw new Error('News provider returned '+res.status);
 const xml=await res.text();
 const matches=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0,15);
 const results=matches.map((match,index)=>{const item=match[1],title=tag(item,'title'),link=tag(item,'link'),published=tag(item,'pubDate'),source=tag(item,'source');return {id:String(index),title,source_url:link,source_name:source||'Google News',published_at:published,industry,buying_signal:title,score:null}}).filter(r=>r.title&&r.source_url.startsWith('https://'));
 return NextResponse.json({results,query,notice:'Public news mentions are unverified prospects, not confirmed buyers. Review the source before saving.'},{headers:{'Cache-Control':'private, no-store'}});
 }catch{return NextResponse.json({error:'News discovery is temporarily unavailable. Please retry.'},{status:502})}
}
