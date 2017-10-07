import $ from 'jquery';

export default class HttpService {
    static getResponseData(urlPath, successFunction, failureFunction) {
        $.ajax({
            url: urlPath,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function (resultData) {
                successFunction(resultData);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                failureFunction(jqXHR, textStatus, errorThrown);
            },
            timeout: 120000,
        });
    }

    static getResponseData2(urlPath, successFunction, failureFunction) {
        return fetch(urlPath)
            // .then((response) => response.json())
            // .then(ApiUtils.checkStatus)
            .then(HttpService.checkStatus)            
            .then((responseJson) => {
                successFunction(responseJson);
            })
            .catch((error) => {
                failureFunction(error);
                console.error(error);
            });
    }

    static async getResponseData3(urlPath, successFunction, failureFunction) {
        try {
            let response = await fetch(urlPath);
            let responseJson = await response.json();
            successFunction(responseJson);
        } catch (error) {
            failureFunction(error);
            console.error(error);
        }
    }

    static async getResponseData4(urlPath, successFunction, failureFunction) {
        var httpConfig =
            {
                method: 'GET',
                // headers: {
                //   'Accept': 'application/json',
                //   'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({
                //   firstParam: 'yourValue',
                //   secondParam: 'yourOtherValue',
                // }),
                mode: 'cors',
                cache: 'default'
            };

        return fetch(urlPath, httpConfig)
            .then(function (response) {
                if (response.status == 200) return response.json();
                else throw new Error('Something went wrong on api server!');
            })
            .then((responseJson) => {
                successFunction(responseJson);
            })
            .catch((error) => {
                failureFunction(error);
                console.error(error);
            });
    }

    static checkStatus(response) {
        console.log('response status good');        
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }
}

var ApiUtils = {  
    checkStatus: function(response) {
      if (response.status >= 200 && response.status < 300) {
            console.log('response status good');
            return response.json();
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  };