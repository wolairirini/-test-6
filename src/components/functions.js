// 数据排序
export function data_sort(data,visible){
    // console.log(data);
    let datax = [];
    data = data.map((item,index)=>{
        if(item.online){
            datax.unshift(item);
        }else{
            datax.push(item);
        }
    })
    return datax;
}