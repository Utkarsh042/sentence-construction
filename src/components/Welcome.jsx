function Welcome({ onStart }) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Sentence Construction Challenge</h1>
        <div className="mb-8">
          <p className="text-lg mb-4">Fill in the blanks with the correct words to complete sentences!</p>
          <ul className="text-left mx-auto max-w-md space-y-2 list-disc list-inside">
            <li>You'll have 30 seconds per question</li>
            <li>Choose from 4 word options for each blank</li>
            <li>Fill all blanks to proceed to the next question</li>
            <li>Click on filled blanks to unselect words</li>
            <li>Your score will be calculated at the end</li>
          </ul>
        </div>
        <button 
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Start Challenge
        </button>
      </div>
    );
  }
  
  export default Welcome;