import { createClient } from '@supabase/supabase-js';
const url="https://ncrtuhtupugomfmjorde.supabase.co";
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcnR1aHR1cHVnb21mbWpvcmRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTA4NDAsImV4cCI6MjA3ODAyNjg0MH0.Bm2bf3XBuZwOn8yWjAvh7N6ErLmi1tVzMk54eEHTdKg";

const supabase= createClient(url,key)

export default function UploadFile(files){
    return new Promise((resolve,reject)=>{
        const timestamp = Date.now();
        const filename = timestamp+"_"+files.name;

        supabase.storage.from("images").upload(filename,files,{
            cacheControl:"3600",
            upsert:false
        }).then(()=>{
            const publicurl=supabase.storage.from("images").getPublicUrl(filename).data.publicUrl;
            resolve(publicurl);
        }).catch((err)=>{
            reject(err)
        })

    })
}
