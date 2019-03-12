const processExperienceDetails = (filterData) => {
    return filterData.map(item => {
      let obj = item;
      let experience = [];
      let experienceArr = obj.experience ? obj.experience.split(/[\s-]+/) : [];
      
      for(let arrItem of experienceArr){
        if(!isNaN(arrItem)){
          experience.push(arrItem);
        }
      }

      obj.experienceDummy = experience.sort();
      return obj;

    })
  }

  export {processExperienceDetails};