import { useState } from "react";
import image from "./Images/image.png";
import image55 from "./Images/image55.png";
import image6 from "./Images/image6.png";
import image65 from "./Images/image65.png";
import image7 from "./Images/image7.png";
import image8 from "./Images/image8.png";
import image9 from "./Images/image9.png";

enum VariableType {
    mu = "Gas visconsity",
    z = "Z-factor"
}

enum SgValue {
    sg1 = "0.55",
    sg2 = "0.6",
    sg3 = "0.65",
    sg4 = "0.7",
    sg5 = "0.8",
    sg6 = "0.9",
}

const GraphsPlate = () => {
    const [selectedVType, setSelectedVType] = useState<string>('');
    const [selectedSg, setSelectedSg] = useState<string>('');

    const handleVTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as VariableType;
        setSelectedVType(value.toString());
    };

    const handleSgValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as SgValue;
        setSelectedSg(value.toString());
    };

    const getImage = (input: string): string => {
        switch (input) {
            case '0.55':
                return image55;
            case '0.6':
                return image6;
            case '0.65':
                return image65;
            case '0.7':
                return image7;
            case '0.8':
                return image8;
            case '0.9':
                return image9;
            default:
                return '';
        }
    };

    const selectedImage = getImage(selectedSg);

    return (
        <div className="mb-4 p-6 bg-gray-50 border border-gray-300 rounded-lg  shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 flex justify-center">Graphs</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Variable type</label>
                <select 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={selectedVType || ""}
                    onChange={handleVTypeChange}
                >
                    <option value="" disabled>Select variable type</option>
                    {Object.values(VariableType).map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            </div>
            {selectedVType === "Z-factor" && 
            <>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Gas specific gravity</label>
                    <select 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={selectedSg || ""}
                        onChange={handleSgValueChange}
                    >
                        <option value="" disabled>Select gas specific gravity</option>
                        {Object.values(SgValue).map((v) => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            </>}

            {selectedVType === "Gas visconsity" && 
            <>
                <img src = {image} className="shadow-md rounded-lg"/>
            </>}

            {selectedVType === "Z-factor" &&
                <img src = {selectedImage} className="shadow-md rounded-lg"/>
            }
        </div>
    );

}

export default GraphsPlate;