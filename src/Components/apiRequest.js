export default async function apiRequest(URL='', optionsObj=null, errMsg=null) {
    try {
        const response = await fetch(URL, optionsObj);
    
        if (!response.ok) throw Error('Please reload the app');

    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }

}