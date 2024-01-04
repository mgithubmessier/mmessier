// const RandomSquareShape = () => {
//   const depth = Math.floor(Math.random() * 3) + 2;
//   const randomRotation = Math.floor(Math.random() * 360);
//   const squareStyle = (currentDepth: number): CSSProperties => {
//     const multiple = MAX_SHAPE_SIDE / depth;

//     return {
//       boxSizing: 'border-box',
//       position: 'absolute',
//       width: MAX_SHAPE_SIDE - currentDepth * multiple - 5,
//       height: MAX_SHAPE_SIDE - currentDepth * multiple - 5,
//       bottom: (multiple * currentDepth) / 2,
//       left: (multiple * currentDepth) / 2,
//       backgroundColor: colors.alternating[currentDepth].backgroundColor,
//       transform: `rotate(${randomRotation}deg)`,
//     };
//   };

//   const squares = [];
//   for (let i = 0; i < depth; i++) {
//     squares.push(<div key={i} style={squareStyle(i)} />);
//   }

//   const animation: SxProps<Theme> = {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   };

//   return <Box sx={animation}>{squares}</Box>;
// };
