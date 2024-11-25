import { DataForThreePhaseHorizontalCalculation } from "../Input/ThreePhaseHorizontalInputPlate";
import { DataForThreePhaseVerticalCalculation, ThreePhaseVerticalInputs } from "../Input/ThreePhaseVerticalInputPlate";
import { DataForTwoPhaseCalculation, TwoPhaseInputs } from "../Input/TwoPhaseInputPlate";
import ThreePhaseHorizontalSolution from "./ThreePhaseHorizontalSolution";
import ThreePhaseVerticalSolution from "./ThreePhaseVerticalSolution";
import TwoPhaseHorizontalSolution from "./TwoPhaseHorizontalSolution";
import TwoPhaseVerticalSolution from "./TwoPhaseVerticalSolution";

interface Props {
    inputData: DataForTwoPhaseCalculation | DataForThreePhaseVerticalCalculation | DataForThreePhaseHorizontalCalculation | null;
}
const SolutionPlate:React.FC<Props> = ({inputData}) => {
    return (
        <div className="mb-4 p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 flex justify-center">Solution</h2>
            {inputData?.selectedSeparator === "Two-phase Separator Вертикальный" && <TwoPhaseVerticalSolution inputData={inputData as DataForTwoPhaseCalculation}/>}
            {inputData?.selectedSeparator === "Two-phase Separator Горизонтальный" && <TwoPhaseHorizontalSolution inputData={inputData as DataForTwoPhaseCalculation}/>}
            {inputData?.selectedSeparator === "Three-phase Separator Вертикальный" && <ThreePhaseVerticalSolution inputData={inputData as DataForThreePhaseVerticalCalculation}/>}
            {inputData?.selectedSeparator === "Three-phase Separator Горизонтальный" && <ThreePhaseHorizontalSolution inputData={inputData as DataForThreePhaseVerticalCalculation}/>}
        </div>
    );
}

export default SolutionPlate;