#!/usr/bin/env node
import processCli from "./healthbot";

if (process.argv.length < 5) {
  console.log("Usage: node healthbotCli.js get_scenarios <tenantName> <API_JWT_secret>");
  console.log("Usage: node healthbotCli.js get_scenario <tenantName> <API_JWT_secret> <scenarioName> <outputFilePath>");
  console.log("Usage: node healthbotCli.js post_scenario <tenantName> <API_JWT_secret> <inputFilePath>");
  console.log("Usage: node healthbotCli.js get_medical <tenantName> <API_JWT_secret>");
  console.log("Usage: node healthbotCli.js post_medical <tenantName> <API_JWT_secret> <inputFilePath>");
  console.log("Usage: node healthbotCli.js get_privacy <tenantName> <API_JWT_secret>");
  console.log("Usage: node healthbotCli.js post_privacy <tenantName> <API_JWT_secret> <inputFilePath>");
  console.log("Usage: node healthbotCli.js get_interactions <tenantName> <API_JWT_secret>");
  console.log("Usage: node healthbotCli.js post_interactions <tenantName> <API_JWT_secret> <inputFilePath>");
  process.exit();
}

processCli();