# azure-healthbot-ci
Node CLI utility to snapshot Azure Healthbot configurations and import them into new environments. Can be used to move things from a temporary staging environment into production without disrupting user interactions with bots.

# Getting started

```
npm install azure-healthbot-ci -g
```

# Usage 

## Fetching Configurations
```
azure-healthbot-ci get_scenarios <tenantName> <API_JWT_secret>
azure-healthbot-ci get_scenario <tenantName> <API_JWT_secret> <scenarioName> <outputFilePath>
azure-healthbot-ci get_medical <tenantName> <API_JWT_secret> <outputFilePath>
azure-healthbot-ci get_privacy <tenantName> <API_JWT_secret> <outputFilePath>
azure-healthbot-ci get_interactions <tenantName> <API_JWT_secret> <outputFilePath>
```
## Updating Configurations
```
azure-healthbot-ci post_scenario <tenantName> <API_JWT_secret> <inputFilePath>
azure-healthbot-ci post_medical <tenantName> <API_JWT_secret> <inputFilePath>
azure-healthbot-ci post_privacy <tenantName> <API_JWT_secret> <inputFilePath>
azure-healthbot-ci post_interactions <tenantName> <API_JWT_secret> <inputFilePath>
```

# Authentication
Both __tenantName__ and __API_JWT_secret__ values comes from the _Integration_ > _Secrets_ page within the Healthbot Service management portal. 
