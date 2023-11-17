import React, { useState } from 'react';
import './Circle.css'; // Import the CSS file
import LogoSmall from '../../assets/logo_small.png';

const CircleComponent = ({componentClicked}) => {
  const [clickedSection, setClickedSection] = useState(null);

  const handleClick = (section) => {
    // Update the clicked section in the state
    console.log(`clicked ${section}`)
    setClickedSection(section);
    componentClicked(section);
  };

  const renderQuarterCircle = (section, text) => {
    const expanded = clickedSection === section;
    const expansionFactor = 1.1;

    const startAngle = section + 45;
    const textX = Math.sin((startAngle * Math.PI) / 180) * 35 + 50;
    const textY = Math.cos((startAngle * Math.PI) / 180) * -35 + 50;
    const textRotation =
      startAngle < 90
        ? startAngle
        : startAngle < 180
        ? startAngle + 180
        : startAngle < 270
        ? startAngle + 180
        : startAngle;

    const pathStroke = {
      stroke: 'white',
      strokeWidth: 2,
      fill: '#F79F2D', // Fill color conditionally
    };

    const ringStroke = {
      stroke: 'white',
      strokeWidth: 2, // Adjust the thickness of the ring as needed
      fill: 'none',
    };

    const textStyle = {
      fontSize: '8px',
    };

    return (
      <g key={section} onClick={() => handleClick(section)}>
        {/* Quarter Circle */}
        <path
          d="M50 50 L50 0 A50 50 0 0 1 100 50 Z"
          transform={`rotate(${section} 50 50) scale(${
            expanded ? expansionFactor : 1
          })`}
          style={pathStroke}
        />
        
        {/* Ring */}
        <circle
          cx="50"
          cy="50"
          r="20" // Adjust the radius of the ring as needed
          style={ringStroke}
        />
        
        {/* Text */}
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          transform={`rotate(${textRotation} ${textX} ${textY})`}
          style={textStyle}
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <div style={{cursor:'pointer'}}>
      <svg viewBox={`-20 -20 150 150`} width="500" height="500">
      {renderQuarterCircle(0, 'Mobilization')}
      {renderQuarterCircle(90, 'Training')}
      {renderQuarterCircle(180, 'Employment')}
      {renderQuarterCircle(270, 'Retention')}
    </svg>
    <div className='circle-logo'>
       <img src={LogoSmall} alt='logo-small'/>
    </div>
    </div>
  );
};

export default CircleComponent;