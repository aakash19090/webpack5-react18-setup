import React from 'react'
import './styles/index.scss'
import sampleImg1 from './images/1.jpeg';
import sampleImg2 from './images/2.png';
import SampleImg3 from './images/3.svg';
import SampleImg4 from './images/4.svg';


function App() {
	return (
		<>
			<div className='test'>App</div>
			<img src={sampleImg1} alt="sampleImg1" />
			<SampleImg3 />
		</>

	)
}

export default App