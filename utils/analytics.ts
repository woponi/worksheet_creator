import ReactGA from 'react-ga';

export const initGA = ():void => {
  ReactGA.initialize('G-MQ19L50V11'); // Replace with your GA tracking ID
  console.log("GA initialized");
};