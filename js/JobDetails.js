import React from 'react';
import PropTypes from 'prop-types';
import {JOBTITLE,JOBID,COMPANY,LOCATION,SALARY,
    TYPE,START_DATE,END_DATE,
    APPLY_LINK,SOURCE,SKILLS,EXPERIENCE} from './constants';

const JobDetails = (props) => {
    const {jobInfo} = props;
    return jobInfo._id ? (
        <div className="job-item">
            <div>{`${JOBTITLE} ${jobInfo.title}`}</div>
            <div>{`${JOBID} ${jobInfo._id}`}</div>
            <div>{`${COMPANY} ${jobInfo.companyname}`}</div>
            <div>{`${LOCATION} ${jobInfo.location}`}</div>
            <div>{`${SALARY} ${jobInfo.salary}`}</div>
            <div>{`${EXPERIENCE} ${jobInfo.experience}`}</div>
            <div>{`${TYPE} ${jobInfo.type}`}</div>
            <div>{`${START_DATE} ${jobInfo.startdate}`}</div>
            <div>{`${END_DATE} ${jobInfo.enddate}`}</div>
            <div>{`${APPLY_LINK} ${jobInfo.applylink}`}</div>
            <div>{`${SOURCE} ${jobInfo.source}`}</div>
            <div>{`${SKILLS} ${jobInfo.skills}`}</div>
        </div>
    ) : null;
}

JobDetails.defaultProps = {
    jobInfo : {}
};

JobDetails.propTypes = {
    jobInfo : PropTypes.object
};

export default JobDetails;
