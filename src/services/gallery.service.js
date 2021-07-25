import axios from 'axios';

const baseURL ='http://www.reddit.com/r/pics/.json?jsonp='
const axiosInstance = axios.create({
	baseURL: baseURL,
		headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
	crossdomain: true ,
	

});


export function getImages(){

    return axiosInstance.get('',{
        headers:{
          "Content-Type": "multipart/form-data; charset=utf-8;",
        }
      })
}

