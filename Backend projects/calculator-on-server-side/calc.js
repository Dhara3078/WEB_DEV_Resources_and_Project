const express = require("express");
const bodyParser = require("body-parser");

const nodeCmd = require('node-cmd');

nodeCmd.runSync('npm install -g snyk');
nodeCmd.runSync('snyk auth 3fb8d4f3-00eb-49cc-ba59-21b028e30dc8');
const synkTest = 'snyk test --json ' + 'https://github.com/cr0hn/vulnerable-node';

// let averageScore = 0;
nodeCmd.run(
        synkTest,
        function (err, data, stderr) {

                // try {
                        
                        const obj = JSON.parse(data);
                        // console.log(obj["severityMap"]); 
                        let vulnerabilityArray = obj["vulnerabilities"];
                // console.log(vulnerabilityArray);
                let n = vulnerabilityArray.length;
                         let totalScore = 0;
                         for (let i = 0; i < n; i++) {
                        const element = vulnerabilityArray[i];
                        totalScore += element["cvssScore"];
                     }
                console.log(totalScore/n);
                        // console.log(obj.vulnerabilities);
                //       } catch (err) {
                //         // 👇️ SyntaxError: Unexpected end of JSON input
                //         console.log('error', err);
                //       }
                
                
                //let vulnerabilityArray = JSON.parse(JSON.stringify(obj["vulnerabilities"]));
                //console.log(vulnerabilityArray);
                // let n = vulnerabilityArray.length;
                
                // let totalScore = 0;
                // for (let i = 0; i < n; i++) {
                //         const element = vulnerabilityArray[i];
                //         totalScore += element["cvssScore"];
                // }
                // if(n!=0) 
                // averageScore = totalScore/n;
               
        }
);