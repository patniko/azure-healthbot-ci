
function getConfiguration(name) {
  if (action === "get_scenario") {
    const options = {
      method: 'GET',
      uri: `${BASE_URL}api/account/${tenantName}/configuration/${name}/read`,
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };

    rp(options)
      .then(function (parsedBody) {
        fs.writeFile(targetFile, parsedBody, (err) => {
          if (err) {
            console.error(err);
            return;
          };
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }
}

function postConfiguration(name, targetFile) {
  fs.readFile(targetFile, 'utf8', (err, configJson) => {
    if (err) {
      console.log("File read failed:", err)
      return
    } else {
      const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/configuration/${name}/save`,
        headers: {
          'Authorization': 'Bearer ' + jwtToken
        },
        body: configJson,
        json: true
      };

      rp(options)
        .then(function (parsedBody) {
          // Remain silent to follow *nix standards
          //console.log(parsedBody);
        })
        .catch(function (err) {
          console.log(err.message);
        });
    }
  });
}

function processArgs() {
  const jwt = require("jsonwebtoken");
  const rp = require("request-promise");
  const fs = require('fs');

  const action = process.argv[2];
  const tenantName = process.argv[3];
  const jwtSecret = process.argv[4];
  const scenarioName = process.argv[5];
  const targetFile = process.argv[6];

  const BASE_URL = "https://us.healthbot.microsoft.com/";

  const jwtToken = jwt.sign({ "tenantName": tenantName }, jwtSecret);

  if (action === "post_scenario") {

    fs.readFile(targetFile, 'utf8', (err, scenarioJson) => {
      if (err) {
        console.log("File read failed:", err)
        return
      } else {
        const options = {
          method: 'POST',
          uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          },
          body: [scenarioJson],
          json: true
        };

        rp(options)
          .then(function (parsedBody) {
            // Remain silent to follow *nix standards
            //console.log(parsedBody);
          })
          .catch(function (err) {
            console.log(err.message);
          });
      }
    });
  }

  if (action === "get_scenarios") {
    const options = {
      method: 'GET',
      uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };

    rp(options)
      .then(function (parsedBody) {
        const scenarios = JSON.parse(parsedBody);
        scenarios.map(i => {
          console.log(`${i.name} ${i.description ? "- " + i.description : ""}`)
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }

  if (action === "get_scenario") {
    const options = {
      method: 'GET',
      uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    };

    rp(options)
      .then(function (parsedBody) {
        const scenarios = JSON.parse(parsedBody);
        scenarios.map(i => {
          if (i.name === scenarioName) {
            var data = JSON.stringify(i);
            fs.writeFile(targetFile, data, (err) => {
              if (err) {
                console.error(err);
                return;
              };
            });
          }
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }


  if (action === "get_medical")
    getConfiguration("medical/triage");
  else if(action === "post_medical")
    postConfiguration("conversation/interactions", targetFile);
  else if(action === "get_privacy")
    getConfiguration("compliance/privacy");
  else if(action === "post_privacy")
    postConfiguration("compliance/privacy", targetFile);
  else if(action === "get_interactions")
    getConfiguration("conversation/interactions");
  else if(action === "post_interactions")
    postConfiguration("conversation/interactions", targetFile);
}

module.exports.processArgs = processArgs;