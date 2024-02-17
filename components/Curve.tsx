import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CurveProps = {
    width: number;
};

const Curve: React.FC<CurveProps> = ({ width }) => (
    <Svg height="50" width={width} style={{ position: 'absolute', bottom: 0 }}>
        <Path
            d={`M0,0 Q${width / 2},100 ${width},0 V100 H0`}
            fill="#F2F2F2"
        />
    </Svg>
);

export default Curve;