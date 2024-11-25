import React, { useEffect, useState } from 'react';
import Latex from 'react-latex';
import { DataForTwoPhaseCalculation } from '../Input/TwoPhaseInputPlate';
import { DataForThreePhaseVerticalCalculation } from '../Input/ThreePhaseVerticalInputPlate';
import { Calculation } from '../../Services/CalculationService';
import { number } from 'yup';

interface Props {
    inputData: DataForTwoPhaseCalculation;
}

const tableData = {
    1: [24, 30, 36, 42, 48],
    2: [24, 30, 36, 42],
    3: [24, 30, 36]
}



const TwoPhaseVerticalSolution:React.FC<Props> = ({inputData}) => {
    const SG = Calculation.SG(inputData.formInputs.Sgo);
    const pl = Calculation.pl(SG as number);
    const pg = Calculation.pg(inputData.formInputs.Sg, inputData.formInputs.Po, inputData.formInputs.To, inputData.formInputs.ZFactor as number);
    const Vt0 = Calculation.Vt(pl as number, pg as number, inputData.formInputs.dm);

    const Re0 = Calculation.Re(pg as number, inputData.formInputs.dm, Vt0 as number, inputData.formInputs.mu);
    const CD0 = Calculation.Cd(Re0 as number);

    const VtWithCd1 = Calculation.VtWithCd(pl as number, pg as number, inputData.formInputs.dm, CD0 as number);
    const Re1 = Calculation.Re(pg as number, inputData.formInputs.dm, VtWithCd1 as number, inputData.formInputs.mu);
    const CD1 = Calculation.Cd(Re1 as number);

    const VtWithCd2 = Calculation.VtWithCd(pl as number, pg as number, inputData.formInputs.dm, CD1 as number);
    const Re2 = Calculation.Re(pg as number, inputData.formInputs.dm, VtWithCd2 as number, inputData.formInputs.mu);
    const CD2 = Calculation.Cd(Re2 as number);

    const VtWithCd3 = Calculation.VtWithCd(pl as number, pg as number, inputData.formInputs.dm, CD2 as number);
    const Re3 = Calculation.Re(pg as number, inputData.formInputs.dm, VtWithCd3 as number, inputData.formInputs.mu);
    const CD3 = Calculation.Cd(Re3 as number);

    const VtWithCd4 = Calculation.VtWithCd(pl as number, pg as number, inputData.formInputs.dm, CD3 as number);
    const Re4 = Calculation.Re(pg as number, inputData.formInputs.dm, VtWithCd4 as number, inputData.formInputs.mu);
    const CD4 = Calculation.Cd(Re4 as number);

    const d2 = Calculation.d2(inputData.formInputs.To, inputData.formInputs.ZFactor, inputData.formInputs.Qg, inputData.formInputs.Po, pg as number, pl as number, CD4 as number, inputData.formInputs.dm)
    const dmin = (d2 as number)**0.5;

    const Ql = Calculation.Ql(inputData.formInputs.Qw, inputData.formInputs.Qo);
    const d2h = Calculation.d2h(inputData.formInputs.tr, Ql as number);

    const rows = tableData[inputData.formInputs.tr as 1 | 2 | 3].map(d => {
        const hValue = Calculation.h(d2h as number, d**2) as number;
        const LssValue = Calculation.Lss(hValue as number, d) as number;
        const SRValue = Calculation.SR(LssValue as number, d) as number;
    
        return { d, hValue, LssValue, SRValue };
    });

    const latex1_1 = `$$SG=\\frac{141.5}{131.5+API}$$`;
    const latex1_2 = `$$SG=\\frac{141.5}{131.5+${inputData.formInputs.Sgo}}$$`;
    const latex1_3 = `$$SG=${SG}$$`;

    const latex1_4 = `$$ρ_l=62.4*SG$$`;
    const latex1_5 = `$$ρ_l=62.4*${SG}$$`;
    const latex1_6 = `$$ρ_l=${pl}\\ lb/ft^3$$`;

    const latex1_7 = `$$ρ_g=2.7*\\frac{SG*P_o}{T_o*Z}$$`;
    const latex1_8 = `$$ρ_g=2.7*\\frac{${inputData.formInputs.Sg}*${inputData.formInputs.Po}}{${inputData.formInputs.To}*${inputData.formInputs.ZFactor}}$$`;
    const latex1_9 = `$$ρ_g=${pg}\\ lb/ft^3$$`;

    const latex1_10 = `$$V_t=0.0204*[\\frac{(ρ_l-ρ_g)*d_m}{ρ_g}]^{1/2}$$`;
    const latex1_11 = `$$V_t=0.0204*[\\frac{(${pl}-${pg})*${inputData.formInputs.dm}}{p_g}]^{1/2}$$`;
    const latex1_12 = `$$V_t=${Vt0}\\ ft/s$$`;

    const latex1_13 = `$$Re=0.0049*\\frac{ρ_g*d_m*V_t}{μ}$$`;
    const latex1_14 = `$$Re=0.0049*\\frac{${pg}*${inputData.formInputs.dm}*${Vt0}}{${inputData.formInputs.mu}}$$`;
    const latex1_15 = `$$Re=${Re0}$$`;

    const latex1_16 = `$$C_D = \\frac{24}{Re}+\\frac{3}{Re^{1/2}}+0.34$$`;
    const latex1_17 = `$$C_D = \\frac{24}{${Re0}}+\\frac{3}{${Re0}^{1/2}}+0.34$$`;
    const latex1_18 = `$$C_D = ${CD0}$$`;

    const latex2_1 = `$$d^{2}=5040*[\\frac{T*Z*Q_g}{P}]*[(\\frac{p_g}{p_l-p_g})*\\frac{C_D}{d_m}]^{1/2}$$`;
    const latex2_2 = `$$d^{2}=5040*[\\frac{${inputData.formInputs.To}*${inputData.formInputs.ZFactor}*${inputData.formInputs.Qg}}{${inputData.formInputs.Po}}]*[(\\frac{${pg}}{${pl}-${pg}})*\\frac{${CD4}}{${inputData.formInputs.dm}}]^{1/2}$$`;
    const latex2_3 = `$$d^{2}=${d2}$$`;
    const latex2_4 = `$$d=${dmin}\\ in$$`;

    const latex3_1 = `$$Q_l=Q_w+Q_o$$`;
    const latex3_2 = `$$Q_l=${inputData.formInputs.Qw}+${inputData.formInputs.Qo}$$`;
    const latex3_3 = `$$Q_l=${Ql}$$`;

    const latex3_4 = `$$d^{2}*h=\\frac{t_r*Q_l}{0.12}$$`;
    const latex3_5 = `$$d^{2}*h=\\frac{${inputData.formInputs.tr}*${Ql}}{0.12}$$`;
    const latex3_6 = `$$d^{2}*h=${d2h}$$`;

    return (
        <>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 1</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                        <Latex>{latex1_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_2}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_3}</Latex>
                    </div>

                    <div className='mb-4'>
                        <Latex>{latex1_4}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_5}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_6}</Latex>
                    </div>

                    <div className='mb-4'>
                        <Latex>{latex1_7}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_8}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_9}</Latex>
                    </div>

                    <div className='mb-4'>
                        <Latex>{latex1_10}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_11}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_12}</Latex>
                    </div>

                    <div className='mb-4'>
                        <Latex>{latex1_13}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_14}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_15}</Latex>
                    </div>

                    <div className='mb-4'>
                        <Latex>{latex1_16}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex1_17}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex1_18}</Latex>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-left">Iteration 1</h3>
                    <div className=" mb-8 flex flex-col justify-center items-center bg-gray-50 border border-gray-400 rounded-lg shadow-md w-full">
                        <div className='mb-4 mt-4'>
                            <Latex>{`$$V_t=0.0119*[\\frac{(ρ_l-ρ_g)*d_m}{ρ_g * C_D}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$V_t=0.0119*[(\\frac{${pl}-${pg}}{${pg}})*\\frac{${inputData.formInputs.dm}}{${CD0}}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$V_t=${VtWithCd1}\\ ft/s$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{ρ_g*d_m*V_t}{μ}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{${pg}*${inputData.formInputs.dm}*${VtWithCd1}}{${inputData.formInputs.mu}}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$Re=${Re1}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{Re}+\\frac{3}{Re^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{${Re1}}+\\frac{3}{${Re1}^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = ${CD1}$$`}</Latex>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-left">Iteration 2</h3>
                    <div className="mb-8 flex flex-col justify-center items-center bg-gray-50 border border-gray-400 rounded-lg shadow-md w-full">
                        <div className='mb-4 mt-4'>
                            <Latex>{`$$V_t=0.0119*[\\frac{(ρ_l-ρ_g)*d_m}{ρ_g * C_D}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$V_t=0.0119*[(\\frac{${pl}-${pg}}{${pg}})*\\frac{${inputData.formInputs.dm}}{${CD1}}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$V_t=${VtWithCd2}\\ ft/s$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{ρ_g*d_m*V_t}{μ}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{${pg}*${inputData.formInputs.dm}*${VtWithCd2}}{${inputData.formInputs.mu}}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$Re=${Re2}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{Re}+\\frac{3}{Re^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{${Re2}}+\\frac{3}{${Re2}^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = ${CD2}$$`}</Latex>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-left">Iteration 3</h3>
                    <div className="mb-8 flex flex-col justify-center items-center bg-gray-50 border border-gray-400 rounded-lg shadow-md w-full">
                        <div className='mb-4 mt-4'>
                            <Latex>{`$$V_t=0.0119*[\\frac{(ρ_l-ρ_g)*d_m}{ρ_g * C_D}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$V_t=0.0119*[(\\frac{${pl}-${pg}}{${pg}})*\\frac{${inputData.formInputs.dm}}{${CD2}}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$V_t=${VtWithCd3}\\ ft/s$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{ρ_g*d_m*V_t}{μ}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{${pg}*${inputData.formInputs.dm}*${VtWithCd3}}{${inputData.formInputs.mu}}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$Re=${Re3}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{Re}+\\frac{3}{Re^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{${Re3}}+\\frac{3}{${Re3}^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = ${CD3}$$`}</Latex>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-left">Iteration 4</h3>
                    <div className="flex flex-col justify-center items-center bg-gray-50 border border-gray-400 rounded-lg shadow-md w-full">
                        <div className='mb-4 mt-4'>
                            <Latex>{`$$V_t=0.0119*[\\frac{(ρ_l-ρ_g)*d_m}{ρ_g * C_D}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$V_t=0.0119*[(\\frac{${pl}-${pg}}{${pg}})*\\frac{${inputData.formInputs.dm}}{${CD3}}]^{1/2}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$V_t=${VtWithCd4}\\ ft/s$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{ρ_g*d_m*V_t}{μ}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$Re=0.0049*\\frac{${pg}*${inputData.formInputs.dm}*${VtWithCd4}}{${inputData.formInputs.mu}}$$`}</Latex>
                        </div>
                        <div className='mb-8'>
                            <Latex>{`$$Re=${Re4}$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{Re}+\\frac{3}{Re^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = \\frac{24}{${Re4}}+\\frac{3}{${Re4}^{1/2}}+0.34$$`}</Latex>
                        </div>
                        <div className='mb-4'>
                            <Latex>{`$$C_D = ${CD4}$$`}</Latex>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 2</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                            <Latex>{latex2_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex2_2}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex2_3}</Latex>
                    </div>
                    <div>
                        <Latex>{latex2_4}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 3</h3>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-400 rounded-lg shadow-md max-w-full mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <div className='mb-4'>
                        <Latex>{latex3_1}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex3_2}</Latex>
                    </div>
                    <div className='mb-8'>
                        <Latex>{latex3_3}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex3_4}</Latex>
                    </div>
                    <div className='mb-4'>
                        <Latex>{latex3_5}</Latex>
                    </div>
                    <div>
                        <Latex>{latex3_6}</Latex>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Step 4</h3>
            <table className="min-w-full bg-gray-50 border border-gray-400 text-center rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$t_r\\ (min)$$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$d\\ (in)$$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$h\\ (in)$$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$Lss\\ (ft)$$`}</Latex></th>
                        <th className="border border-gray-300 px-4 py-2"><Latex>{`$$SR\\ (12Lss/d)$$`}</Latex></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ d, hValue, LssValue, SRValue }, index) => {
                        const isHighlighted = d > dmin && SRValue >= 3 && SRValue <= 4;

                        return (
                            <tr key={index} className={isHighlighted ? 'bg-red-200' : ''}>
                                <td className="border border-gray-300 px-4 py-2">{inputData.formInputs.tr}</td>
                                <td className="border border-gray-300 px-4 py-2">{d}</td>
                                <td className="border border-gray-300 px-4 py-2">{hValue}</td>
                                <td className="border border-gray-300 px-4 py-2">{LssValue}</td>
                                <td className="border border-gray-300 px-4 py-2">{SRValue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default TwoPhaseVerticalSolution;