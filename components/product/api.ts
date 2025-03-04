import axios from "axios";
import Papa from "papaparse";

export default {
  list: async () =>{
    return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vS1d8WKiiCr2qDLPFdN0avYUcv0orfe0uWmP0AktF9zi_impqE_cE912Ee207FZJ8Rhbg9V8tW80Kos/pub?output=csv", {
      responseType: "blob"
    }).then(
      response =>{
        return new Promise((resolve, reject)=>{
          Papa.parse(response.data, {
            header: true,
            complete: results => {
              return resolve(results.data);
            },
            error: (error)=> {
              return reject(error.message);
            }
          });
        })
      }
    );
  },
};