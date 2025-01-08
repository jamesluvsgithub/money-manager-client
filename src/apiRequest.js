const apiRequest = async (url='', optionsObj=null, errMsg=null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw Error(errorMessage || 'API request error');
    }
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
}

export default apiRequest;