export const saveLocalStore = (data,key)=>{
    // data là dữ liệU, 
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key,dataJson)
};

export const getLocalStore = (key)=>{
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
    // lệnh return giúp t biết được khi đổ dữ liệu về nếu có sẽ trả về JSON nếu ko thì null
}