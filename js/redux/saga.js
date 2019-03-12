import "regenerator-runtime/runtime";
import { put, takeLatest, all } from 'redux-saga/effects';
import {processExperienceDetails} from '../utility';


function* fetchData(action) {
  const {experience, location, skill} = action.payload;
  const apiResponse = yield fetch('https://api.myjson.com/bins/kez8a')
        .then(response => response.json());
  const filteredData = filterData(apiResponse.jobsfeed, experience, location, skill);

  yield put({ type: "DATA_RECEIVED", data: filteredData});
}


function* actionWatcher() {
     yield takeLatest('FETCH_DATA', fetchData)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}



function filterData (data, experience, location, skill) {
  const locationMap = {
    '':'',
    'Bangalore' : 'Bangalore, Bengaluru',
    'Bengaluru' : 'Bangalore, Bengaluru'
  };
  
  let locationFilterData = [],locSkillFilterData=[],allFilterData=[];
  skill = String(skill).toLowerCase();
  location = String(location).toLowerCase();

  //Get Location Filtered
  if(location === ''){
    locationFilterData = data;
  }
  else if(location.indexOf('/') !== -1){
    locationFilterData = data.filter((item) => locationMap[item.location] && locationMap[item.location].indexOf(location) !== -1);
  }
  else{
    locationFilterData = data.filter((item) => item.location.indexOf(location) !== -1);
  }

  //Get Skills Filtered
  if(skill === ''){
    locSkillFilterData = locationFilterData;
  }
  else{
    locSkillFilterData = locationFilterData.filter((item) => String(item.skills).toLowerCase().indexOf(skill) !==-1);
  }
  
  //Get Experience Filtered
  if(experience === 'All'){
    allFilterData = locSkillFilterData;
  }
  else if(experience === 'Fresher'){
    allFilterData = locSkillFilterData.filter((item) => item.experience === experience);
  }
  else {
    let alteredData = processExperienceDetails(locSkillFilterData);
    let consolidatedExperience = [];

    const experienceArr = experience.split('-');
    const anyExperienceData = alteredData.filter(item => item.experienceDummy.includes(''));
    
    for(let i=Number(experienceArr[0]);i<=Number(experienceArr[1]);i++){

      const filterData = alteredData.filter((item) => {
        return item.experienceDummy.includes(String(i))
      });

      if(filterData && filterData[0]){
        consolidatedExperience.push(...filterData)
      }

    }

    allFilterData = [...consolidatedExperience,...anyExperienceData]
  }
  return allFilterData;
}