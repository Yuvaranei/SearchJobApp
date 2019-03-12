import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { getData } from './redux/actions';
import JobDetails from './JobDetails'
import orderBy from 'lodash.orderby';
import {processExperienceDetails} from './utility';
import {SEARCH_JOBS,JOB_LISTING,LOCATION,SKILLS,EXPERIENCE,
    SORT,SORT_UP,SORT_DOWN} from './constants';

const expreinceValue = [
    'All',
    'Fresher',
    '1-2',
    '3-5',
    '5-7',
    '7-10'
]

class Home extends React.Component{

    constructor(props){
        super(props);

        this.updateLocationData = this.updateLocationData.bind(this);
        this.updateSkillData = this.updateSkillData.bind(this);
        this.getJobDetails = this.getJobDetails.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.updateSortStatus = this.updateSortStatus.bind(this);

        this.sortFactors = ['none','low','high'];
        this.sortIcon = 'sort';
        this.sortedData = [];

        this.state = {
            data : this.props.data,
            searchInput : '',
            skillInput: '',
            jobList : [],
            sortOrder : 'none',
            expSortOrder : 'none',
            activePage : 1,
            activeIndex : 1,
            experience: 'All'
        }
        
    }

    onKeyPress (e) {
        if(e.key === 'Enter') {
            this.getJobDetails(); 
        }
    }

    componentDidMount(){
        this.getJobDetails();
    }

    updateLocationData (e) {
        this.setState({searchInput: e.target.value});
    }

    updateSkillData (e) {
        this.setState({skillInput: e.target.value});
    }

    updateExperience (e) {
        this.setState({experience: e.target.value});
    }

    sortjobsByLocation(sortFactor){
       this.sortedData = orderBy(this.props.data,['location'],sortFactor);
        this.setState({
            sortOrder : sortFactor,
            expSortOrder : 'none'
        })
    }

    sortjobsByExperience(sortFactor){
        const processedData = processExperienceDetails(this.props.data);
        this.sortedData = orderBy(processedData,['experienceDummy'],sortFactor);
    
        this.setState({
            expSortOrder : sortFactor,
            sortOrder : 'none'
        })
    }

    updateSortStatus(sortItem){
        let sortOrder,sortIcon,sortFunc;
        if(sortItem === 'location'){
            sortOrder = 'sortOrder';
            sortIcon = 'sortIcon';
            sortFunc = 'sortjobsByLocation';
        }
        else{
            sortOrder = 'expSortOrder';
            sortIcon = 'expSortIcon'
            sortFunc = 'sortjobsByExperience';
        }

         switch(this.state[sortOrder]){
             case 'none' : {
                 this[sortFunc]('desc');
                 break;
             }
             case 'desc' : {
                this[sortFunc]('asc');
                 break;
             }
             case 'asc' : {
                 this.setState({
                     [sortOrder] : 'none'
                    }); 
                 this[sortIcon] = 'sort';
                 this.sortedData = [];
                 break;
             }
         }
    }   
    
    getJobs(){
        const jobList = (this.state.sortOrder === 'none' && this.state.expSortOrder === 'none') 
                            ? (this.props.data ? this.props.data : [])
                            : this.sortedData;

        let sortIcon = this.state.sortOrder;
        if(this.state.sortOrder === 'desc'){
            sortIcon = SORT_UP;
        }
        else if(this.state.sortOrder === 'asc'){
            sortIcon = SORT_DOWN;
        }
        else{
            sortIcon = SORT;
        }

        let expSortIcon = this.state.expSortOrder;
        if(this.state.expSortOrder === 'desc'){
            expSortIcon = SORT_UP;
        }
        else if(this.state.expSortOrder === 'asc'){
            expSortIcon = SORT_DOWN;
        }
        else{
            expSortIcon = SORT;
        }

        
        
        if(jobList && jobList[0]){
            const jobLength = jobList.length;
            const jobString = jobLength === 1 ? 'job' : 'jobs';
            return <Fragment>
                        <div className="sort-section">
                            <button 
                                className="theme-button sort-by-location" 
                                onClick={this.updateSortStatus.bind(this,'location')}
                                
                            >
                                Sort By Location <i className={`fa fa-${sortIcon}`}></i>
                            </button>
                            <button 
                                className="theme-button sort-by-experience" 
                                onClick={this.updateSortStatus.bind(this,'experience')}
                            >
                                Sort By Experience <i className={`fa fa-${expSortIcon}`}></i>
                            </button>
                        </div>
                        <div className="total-jobs">{`Found ${jobLength} ${jobString}..`}</div>
                        <div className="job-items">
                        {                    
                            jobList.map((item,index) => {
                                return <JobDetails 
                                            key={item._id+index} 
                                            jobInfo={item}
                                        />
                            })
                        }
                        </div>
                    </Fragment>
            
           
        }
        else{
            return <div className="no-jobs-found">No Jobs found...</div>
        }
    }


    getJobDetails(){
        const {experience, searchInput, skillInput} = this.state;
        this.props.getData(experience, searchInput, skillInput);
    }

    render(){       
        return(
            <div>
                <h2 className="search-title">{SEARCH_JOBS}</h2>
                <div className="job-search-container">
                    <div className="experience-list-container">
                        <span className="labels">{EXPERIENCE}</span>
                        <select className="experience-list" value={this.state.experience} onChange={this.updateExperience}>
                            {
                                expreinceValue.map((item, index) => <option key={item+index} value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                    <div className="location-search">
                        
                        <span className="labels">{LOCATION}</span>
                        <input type="text" 
                            className="location-search-box" 
                            placeholder="Search by location"
                            value={this.state.searchInput}
                            onChange={this.updateLocationData}
                            onKeyPress={this.onKeyPress}
                        />
                    </div>

                     <div className="keyword-skill-search">
                        
                        <span className="labels">{SKILLS}</span>
                        <input type="text" 
                            className="keyword-skill-search-box" 
                            placeholder="Search by Skill"
                            value={this.state.skillInput}
                            onChange={this.updateSkillData}
                            onKeyPress={this.onKeyPress}
                        />                        
                        
                    </div>
                </div>
                <div className="search-container">
                    <button className="theme-button" type="submit" onClick={this.getJobDetails}>Search Jobs</button>
                </div>

                 <div className="joblisting-section">
                    <h2 className="joblist-title">{JOB_LISTING}</h2>
                    {this.getJobs()}
                 </div>                
            </div> 
        )
    }
}

const mapDispatchToProps = {
    getData: getData,
};

const mapStateToProps = (state) => ({
    data: state.data,
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);