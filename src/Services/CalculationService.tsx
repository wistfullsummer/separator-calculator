interface GraphPoint {
    X: number; // Давление
    Y: number; // Z-Factor
}

interface TemperatureData {
    TemperatureValue: number; // Температура
    Points: GraphPoint[]; // Точки графика
}

interface SPGR {
    SPGRValue: number; // Удельный вес
    Temperatures: TemperatureData[]; // Данные по температурам
}

export class Calculation {
    // static beta = (AwA: number) : number | null => {

    // }

    static pl = (SG: number) : number | null => {
        const res = 62.4*SG;
        return isNaN(res) ? null : res;
    }

    static SG = (API: number) : number | null => {
        const res = 141.5/(131.5+API);
        return isNaN(res) ? null : res;
    }
    
    static pg = (SG: number, Po: number, To: number, Zfactor: number) : number | null => {
        const res = 2.7*((SG*Po)/(To*Zfactor));
        return isNaN(res) ? null : res;
    }

    static Re = (pg: number, dm: number, Vt: number, mu: number) : number | null => {
        const res = 0.0049*pg*dm*Vt/mu;
        return isNaN(res) ? null: res;
    }

    static Cd = (Re: number) : number | null=> {
        const res = 24/Re + 3/Re**(1/2)+0.34;
        return isNaN(res) ? null : res;
    }
    
    static Vt = (pl: number, pg: number, dm: number) : number | null => {
        const res = 0.0204*(((pl-pg)/pg)*dm)**(1/2);
        return isNaN(res) ? null : res;
    }

    static VtWithCd = (pl: number, pg: number, dm: number, Cd: number) : number | null => {
        const res = 0.0119*(((pl-pg)/pg)*dm/Cd)**(1/2);
        return isNaN(res) ? null : res;
    }

    static d2 = (To: number, Zfactor: number, Qg: number, Po: number,
        pg: number, pl: number, Cd: number, dm: number) : number | null => {
       const res = 5040*(To*Zfactor*Qg/Po) * ((pg / (pl-pg)) * Cd / dm) ** (1/2);
       return isNaN(res)? null : res;
   }

    static Ql = (Qw: number, Qo: number) : number | null => {
        const res = Qw+Qo;
        return isNaN(res) ? null : res;
    }

    static d2h = (tr: number, Ql: number) : number | null => {
        const res = tr * Ql / 0.12;
        return isNaN(res) ? null : res;
    }

    static h = (d2h: number, d2: number) : number | null => {
        const res = d2h / d2;
        return isNaN(res) ? null : res;
    }

    static Lss = (h: number, d: number) : number | null => {
        if(d<=36) {
            const res = (h+76)/12;
            return isNaN(res) ? null : res;
        } else {
            const res = (h+d+40)/12;
            return isNaN(res) ? null : res;
        }
    }

    static SR = (Lss: number, d: number) : number | null => {
        const res = (12*Lss)/d;
        return isNaN(res) ? null : res;
    }

    static dGasLeff = 
    (To: number, Zfactor: number, Qg: number, Po: number, 
        pg: number, pl: number, Cd: number, dm: number) : number | null => {
        const res = 420 * ( (To * Zfactor * Qg) / Po ) * (pg / (pl - pg) * Cd / dm) ** 0.5;
        return isNaN(res) ? null : res;
    }

    static GasLeff = (dGasLeff: number, d: number) : number | null => {
        const res = dGasLeff / d;
        return isNaN(res) ? null : res;
    }

    static d2LiquidLeff1 = (tr: number, Ql: number) : number | null => {
        const res = tr*Ql/0.7;
        return isNaN(res) ? null : res;
    }

    static LiquidLeff = (d2LiquidLeff: number, d: number) : number | null => {
        const res = d2LiquidLeff / d**2;
        return isNaN(res) ? null : res;
    }

    static GasLss = (GasLeff:number, d: number) : number | null => {
        const res = GasLeff + d/12;
        return isNaN(res) ? null : res;
    }

    static LiquidLss = (LiquidLeff: number) : number | null => {
        const res = 4/3*LiquidLeff;
        return isNaN(res) ? null : res;
    }

    static deltaSG = (SGw: number, SG: number) : number | null => {
        const res = SGw - SG;
        return isNaN(res) ? null : res;
    }

    static d2Water = (Qo: number, muo: number, deltaSG: number, dropletWater: number) : number | null => {
        const res = (6690 * ((Qo * muo) / (deltaSG * dropletWater ** 2)));
        return isNaN(res) ? null : res;
    }

    static d2Oil = (Qw: number, muw: number, deltaSG: number, dropletOil: number) : number | null => {
        const res = (6690 * ((Qw * muw) / (deltaSG * dropletOil ** 2)));
        return isNaN(res) ? null : res;
    }

    static hohw = (tro: number, Qo: number, trw: number, Qw: number) => {
        const res = (tro*Qo + trw*Qw) / 0.12;
        return isNaN(res) ? null : res;
    }

    static LssWithHohw = (hohw: number, d: number) : number | null=> {
        if(d<=36){
            const res = (hohw + 76) / 12;
            return isNaN(res) ? null : res;
        } else {
            const res = (hohw + d + 40) / 12;
            return isNaN(res) ? null : res;
        }
    }

    static homax = (tro: number, deltaSG: number, dm: number, muo: number) : number | null => {
        const res = (1.28 * 0.001) * tro * deltaSG * dm**2 / muo;
        return isNaN(res) ? null : res;
    }

    static AwA = (Qw: number, trw: number, tro: number, Qo: number) : number | null => {
        const res = 0.5 * Qw * trw / (tro * Qo + trw * Qw);
        return isNaN(res) ? null: res;
    }

    static dmax = (homax : number, beta: number) : number | null => {
        const res = homax/beta;
        return isNaN(res) ? null : res;
    }

    static d2LiquidLeff2 = (Qw: number, trw: number, Qo: number, tro: number) : number | null=> {
        const res = 1.42*(Qw*trw+Qo*tro);
        return isNaN(res) ? null : res;
    }

    static beta = (AwA: number) : number | null => {
        const res = 0.62*(AwA-0.99)**2-0.14;
        return isNaN(res) ? null : res;
    }
}