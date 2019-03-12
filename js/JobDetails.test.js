import { mount } from 'enzyme';
import React from 'react';
import JobDetails from './JobDetails';


const successProps = {
    "_id": "5b2b8a9e263a5020388e87ff",
    "title": "DFX Engineer",
    "applylink": "https://www.techgig.com/jobs/DFX-Engineer/59650",
    "jd": "",
    "companyname": "Intel Technology India Pvt Ltd",
    "location": "Bengaluru/Bangalore",
    "experience": "8-13 yrs",
    "salary": "",
    "type": "",
    "skills": "clusterring, Computing, HTML, CSS",
    "startdate": "",
    "enddate": "",
    "created": "",
    "source": "techgig",
    "timestamp": 1528959791.958316,
    "__v": 0
  };


describe('test JobDetails component ',() => {
    const errorProps = {};

    const successWrapper = mount(<JobDetails {...successProps} />);
    const errorWrapper = mount(<JobDetails {...errorProps} />);
    
    it('should render JobDetails component once', () => {
        expect(successWrapper).toHaveLength(1);
    });
    
    it('JobDetails component should not be rendered when no data passed', () => {
        expect(errorWrapper.find('.job-item')).toHaveLength(0);
    });
});


