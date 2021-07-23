import Loader from 'react-loader-spinner';

const LoaderComponent = () => (
  <Loader
    type="Circles"
    color="#00BFFF"
    height={80}
    width={80}
    timeout={3000}
  />
);

export default LoaderComponent;
