export let returnDataSet = (theLabel, dataArray, backgroundColorArray, borderColorArray, theBorderWidth) => {
    return {
        label: theLabel,  // this is the label for each data set
        data: dataArray,
        backgroundColor: backgroundColorArray,
        borderColor: borderColorArray,
        borderWidth: theBorderWidth
    };
};


export const returnData = (labelsArray, datasetsArray) =>{
    return {
        labels: labelsArray,   // this are the main labels for the x-axis
        datasets: datasetsArray
    }
};
