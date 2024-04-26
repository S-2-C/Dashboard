// Ongoing call time
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const callTime = {
  present: '1:47:50'
}

export default async function CallTimeSlot() {
  return (
    <div className='flex flex-col mb-5 bg-figma-figma1 rounded pt-4 py-12 h-60 justify-center items-center shadow-lg'>
      <div className='flex item-center justify center'>
        <FontAwesomeIcon icon={faClock} className='text-white w-6 h-6 pl-8 pt-8' />
        <h1 className='p-4 text-3xl text-white font-bold '>Ongoing Call Time</h1>
      </div>
      <h1 className='pt-6 text-white text-4xl'> {callTime.present} </h1>
    </div>
  );
}