import PulseLoader from 'react-spinners/PulseLoader';
import "../css/loading.css";

const override = {
  display: 'block',
  margin: '3',
  borderColor: "#ff6584",
};

function Loading() {
  return (
    <div className='loading'>
      <PulseLoader
        cssOverride={override}
        size={20}
        color="#ff6584"
        speedMultiplier={1.3}
      />
    </div>
  )
}


export default Loading
