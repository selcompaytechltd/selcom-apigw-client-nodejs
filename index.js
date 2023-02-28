const axios = require('axios');
const crypto = require('crypto');
const date = require('date-and-time');


class apigwCLient{
    constructor(baseUrl, apiKey, apiSecret){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    computeHeader( jsonData){
        var authToken = "SELCOM" +' '+ Buffer.from(this.apiKey, 'ascii').toString('base64');
        var now= new Date();
        var timestamp = date.format(now,"YYYY-MM-DD[T]HH:mm:ssZZ" );
        var signedFields = ""
        var data= "timestamp=" + timestamp;
        for (var key in jsonData){
            data  = data + "&" + key + "=" + jsonData[key];
            if (signedFields == '')
                signedFields = signedFields + key;
            else
            signedFields = signedFields + "," + key;

        }

        var hmac = crypto.createHmac('sha256', this.apiSecret);
        hmac.update(data);
        var digest= hmac.digest('base64');

        
        return ([authToken, timestamp, digest, signedFields]);
        

    }

    async postFunc(path, jsonData){
        var [authToken, timestamp, digest, signedFields] = this.computeHeader(jsonData);
        
        

        return await axios({
            method:'post',
            url:this.baseUrl + path,
            headers:{
                "Content-type": "application/json",
                "Authorization":authToken,
                "Digest-Method": "HS256",
                "Digest": digest,
                "Timestamp": timestamp,
                "Signed-Fields":signedFields,


            },
            data:jsonData,
        }).then((response)=> {return response.data} )
        .catch((error)=>{return error.response.data});
        

    }

    async  getFunc(path,jsonData){
            var [authToken, timestamp, digest, signedFields] = this.computeHeader(jsonData);
            
            return await  axios({
                method:'get',
                url:this.baseUrl + path,
                headers:{
                    "Content-type": "application/json",
                    "Authorization":authToken,
                    "Digest-Method": "HS256",
                    "Digest": digest,
                    "Timestamp": timestamp,
                    "Signed-Fields":signedFields,


                },
                params:jsonData
            }).then(response=>{return response.data})
            .catch((error)=>{return error.response.data});
        

    }

    async  deleteFunc(path,jsonData){
        var [authToken, timestamp, digest, signedFields] = this.computeHeader(jsonData);
        
        return await axios({
            method:'delete',
            url: this.baseUrl + path, 
            headers:{
                "Content-type": "application/json",
                "Authorization":authToken,
                "Digest-Method": "HS256",
                "Digest": digest,
                "Timestamp": timestamp,
                "Signed-Fields":signedFields,


            },
            params:jsonData,
        }).then((response)=>{return response.data})
        .catch((error)=>{return error.response.data});
        

    }
}

  

module.exports = {apigwCLient};