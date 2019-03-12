import { processExperienceDetails } from "./utility";

describe('test utility.js', () => {
    it('processExperienceDetails - test when experience is demilited with hypen', () => {

        const inputData = [{
            "experience": "8-13 yrs",
          }];

          const outputData = [{
            "experience": "8-13 yrs",
            "experienceDummy": ["13","8"]
          }]
        expect(processExperienceDetails(inputData)).toMatchObject(outputData);
    });

    it('processExperienceDetails - test when experience is empty string', () => {

        const inputData = [{
            "experience": ""
          }];

          const outputData = [{
            "experience": "",
            "experienceDummy": []
          }]
        expect(processExperienceDetails(inputData)).toMatchObject(outputData);
    });

    it('processExperienceDetails - test when experience is demilited with "to" string', () => {

        const inputData = [{
            "experience": "0 to 2 yrs"
          }];

          const outputData = [{
            "experience": "0 to 2 yrs",
            "experienceDummy": ["0","2"]
          }]
        expect(processExperienceDetails(inputData)).toMatchObject(outputData);
    });

    it('processExperienceDetails - test when experience property is not available', () => {

        const inputData = [{}];

          const outputData = [{            
            "experienceDummy": []
          }]
        expect(processExperienceDetails(inputData)).toMatchObject(outputData);
    });

});