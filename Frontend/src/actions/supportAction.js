import * as SupportApi from '../API/SupportRequest.js'

export const toSupport = (data)=> async(dispatch)=> {
    dispatch({type: "SEND_TO_SUPPORT", data: data})
    SupportApi.toSupport(data)
  };