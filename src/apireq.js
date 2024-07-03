const apireq = async(url = "", optionsObj = null, errMsg = null) => {
    try{
        const response = await fetch(url,optionsObj)
        if(!response.ok) throw Error("Pls reload the app")

    }catch(err){
        errMsg = err.Message;

    }finally{
        return errMsg
    }
}
export default apireq