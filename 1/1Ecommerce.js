const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    if(req.url=="/" && req.method=="GET"){
        fs.readFile("products.json","utf-8",(err,data)=>{
            if(err){
                return;
            }else{
                res.end(data);
            }
        })
    }

    if(req.url.startsWith=="/?category" && req.method=="GET"){
        const parsedurl=url.parse(req.url,true);
        const category=parsedurl.query.category;
        fs.readFile("products.json","utf-8",(err,data)=>{
            if(err){
                return;
            }
            else{
                const products=JSON.parse(data);
                const filterProduct=products.filter((product)=>{
                    product.category===category;
                })
                res.end(JSON.stringify(filterProduct));
            }
        })
    }
});

server.listen(3000,(err)=>{
    if(err){
        console.log("unable to start server");
    }else{
        console.log("Server Started");
    }
})