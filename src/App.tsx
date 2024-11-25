import React, { useState } from 'react';
import './App.css';
import InputPlate from './Components/Input/InputPlate';
import Header from './Components/Header';
import OutputPlate from './Components/OutputPlate';
import SolutionPlate from './Components/Solution/SolutionPlate';
import { DataForTwoPhaseCalculation, TwoPhaseInputs } from './Components/Input/TwoPhaseInputPlate';
import { DataForThreePhaseVerticalCalculation } from './Components/Input/ThreePhaseVerticalInputPlate';
import { DataForThreePhaseHorizontalCalculation } from './Components/Input/ThreePhaseHorizontalInputPlate';

function App() {
  const [selectedSeparator, setSelectedSeparator] = useState<string | null>(null);
  const [inputData, setInputData] = useState<DataForTwoPhaseCalculation | DataForThreePhaseVerticalCalculation | DataForThreePhaseHorizontalCalculation>();

  const handleSeparatorChange = (separator: string | null) => {
    setSelectedSeparator(separator);
    setInputData(undefined);
  };

  const handleInputSubmit = (input : DataForTwoPhaseCalculation | DataForThreePhaseVerticalCalculation | DataForThreePhaseHorizontalCalculation) => {
    console.log("set");
    setInputData(input);
  }

  return (
    <>
      <Header payload='Separator Calculator'/>
      <InputPlate onSeparatorChange={handleSeparatorChange} onInputSubmit={handleInputSubmit}/>
      <OutputPlate/>
      {(inputData?.selectedSeparator != null && inputData?.formInputs!=null) ? (
        <SolutionPlate inputData={inputData}/>
      ) : (
        null
      )}
    </>
  );
}

export default App;
