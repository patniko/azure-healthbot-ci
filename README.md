# azure-healthbot-ci
Node CLI utility to snapshot Healthbot scenarios and import them into new environments.

# Usage 
```
node healthbotCli.js get_scenarios <tenantName> <API_JWT_secret>
node healthbotCli.js get_scenario <tenantName> <API_JWT_secret> <scenarioName> <outputFilePath>
node healthbotCli.js post_scenario <tenantName> <API_JWT_secret> <inputFilePath>
```

# Authentication
Both __tenantName__ and __API_JWT_secret__ values comes from the _Integration_ > _Secrets_ page within the Healthbot Service management portal. 
