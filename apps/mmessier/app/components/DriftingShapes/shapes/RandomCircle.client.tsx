// const RandomCircleShape = () => {
//   const depth = Math.floor(Math.random() * 3) + 2;
//   const circleStyle = (currentDepth: number): CSSProperties => {
//     const multiple = MAX_SHAPE_SIDE / depth;

//     return {
//       boxSizing: 'border-box',
//       position: 'absolute',
//       width: MAX_SHAPE_SIDE - currentDepth * multiple,
//       height: MAX_SHAPE_SIDE - currentDepth * multiple,
//       bottom: (multiple * currentDepth) / 2,
//       left: (multiple * currentDepth) / 2,
//       borderRadius: '50%',
//       backgroundColor: colors.alternating[currentDepth].backgroundColor,
//     };
//   };

//   const circles = [];
//   for (let i = 0; i < depth; i++) {
//     circles.push(<div key={i} style={circleStyle(i)} />);
//   }

//   const animation: SxProps<Theme> = {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   };

//   return <Box sx={animation}>{circles}</Box>;
// };
