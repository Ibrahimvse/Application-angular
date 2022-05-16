export interface Category{
    key:String,
    values:Array<String>;
};
export class Categories{
    CategoriesList:Category[]=[];
    isValid():Boolean{
        return this.CategoriesList.length!=0;
    }

    push(key:string,value:string){
        var index=this.CategoriesList.findIndex(c=>c.key==key)
        if(index==-1){
            this.CategoriesList.push({key:key,values:[value]})
        }
        else{
            this.CategoriesList[index].values.push(value)
        }   
    }
    pop(key:string,value:string){
        
        var index=this.CategoriesList.findIndex(c=>c.key==key)
        if(this.CategoriesList[index].values.length==1)
            this.CategoriesList.splice(index,1)
        else{
            var k=this.CategoriesList[index].values.indexOf(value)
            this.CategoriesList[index].values.splice(k,1)
        }
       
    }
    isChecked(key:string,value:string):Boolean{
        var checked=false;
        var index=this.CategoriesList.findIndex(c=>c.key==key);
        if(index!=-1){
            checked =this.CategoriesList[index].values.indexOf(value)!=-1;
        }
        return checked;
    }
    toJsonString():string{
        return JSON.stringify(this.CategoriesList)
    }
    fromJson(items:any[]){
        if(!items) return;
        if(items.length==0) return;
        items.forEach(item=>{
            this.CategoriesList.push({
                key:item.key,
                values:item.values
            })
        })
    }
}