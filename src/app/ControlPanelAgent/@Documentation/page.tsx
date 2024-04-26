//Documentation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default async function DocumentationSlot() {
  return (
    <div className="flex flex-col bg-blue mb-5 rounded-lg h-60 p-4 shadow-lg">
      <div className='flex pb-3'>
        <FontAwesomeIcon icon={faFile} className='w-7 h-7 pr-4 pl-6 pt-2' />
        <h1 className="text-center text-2xl font-bold pt-2">Documentation</h1>
      </div>
      <div className='flex bg-white pt-1 h-1/2 rounded'>
        <label className='pr-6 pl-6 pt-5 justify-center text-2xl font-bold'>Sentiment Analysis</label>
        <p className='text-xs p-3'>Within this pages, you will embark on a journey through the fundamentals of sentiment analysis,
          unraveling its significance and exploring effective strategies</p>
      </div>
    </div>
  );
}