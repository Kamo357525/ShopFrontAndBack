import {ImageProducts, Products, Users} from "../models";

async function main(){
    await Users.sync({alter:true})
    await Products.sync({alter:true})
    await ImageProducts.sync({alter:true})
    process.exit()
}

main()