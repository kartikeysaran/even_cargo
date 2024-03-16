import React , {useState} from 'react'
import './Home.css'
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowCircleRight, FaArrowRight, FaArrowCircleLeft} from "react-icons/fa";
import Important1 from '../../assets/important-1.jpeg';
import Important2 from '../../assets/important-2.png';
import Important3 from '../../assets/important-3.png' ;
import IndianMap from '../../assets/indian_map.png';
import Popup from '../../assets/popup.png';
import Partners from '../../assets/partners.png';
import CircleComponent from '../../components/Circle/Circle';



const Home = () => {
  const [showPopup, setShowPopup] = useState(true);

  const quarters = [
    { id: 1, name: 'Mobilization', info: 'Our priority is to identify and mobilize women belonging to resource-poor communities. There is enough evidence that points...' },
    { id: 2, name: 'Training', info: 'After identifying our batch of women, the training team provides extensive training that focuses on learning about logistics, two-wheeler driving, self-defense and soft-skill development...' },
    { id: 3, name: 'Employment', info: 'Trainees are employed with our e-commerce and logistics partners. We ensure that our delivery associates are employed at hubs that are close to their homes, and are given an assured sum of load on routes that are safe...' },
    { id: 4, name: 'Retention', info: 'Women face immense challenges from different fronts - the family, the community, and the delivery hubs. As it will still take us a long time to bring definitive change in the mindsets around “gender-specific” jobs...' },
  ];

  const slides = [
    {
      image:Important1
    },
    {
      image:Important2
    },
    {
      image:Important3
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const [selectedQuarter, setSelectedQuarter] = useState(1);

  const handleQuarterClick = (quarterId) => {
    setSelectedQuarter(quarterId);
  };

  const handleQuartleCircleClicked = (section) => {
    console.log(`Clicked ${(section/90)+1}`)
    handleQuarterClick((section/90)+1);
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className='home-parent-container'>
      <div className='home-main-container'>
        <div className='home-main-center-text'>
          <h1>Equality Delivered</h1>
          <h2>At your doorsteps</h2>
          <button onClick={openPopup}>Our Story</button>
        </div>
        {showPopup && (
          <div className="popup">

            <button className="close-button" onClick={closePopup}>
              <IoCloseCircle />
            </button>
            <div className="popup-content">
      <img src= {Popup} alt="Popup" className="popup-image"/>
      <div className="popup-text1">
        <h4>Is it possible to achieve gender equity within our lifetime?</h4>
      </div>
      <div className="popup-text2">
        <h3>Willing to join us?</h3>
      </div>
    </div>
          </div>
        )}
      </div>
      <div className='home-what-do-we-do-container'>
        <svg xmlns="http://www.w3.org/2000/svg" width="877" height="540" viewBox="0 0 877 540" fill="none" className='home-container-pink-clouds'>
          <path d="M0.574228 145.42C2.26536 43.2739 58.1115 -44.1467 333.268 25.4623C608.424 95.0714 877.762 401.111 876.071 503.257C874.379 605.402 602.299 464.973 327.143 395.364C51.9873 325.755 -1.11694 247.565 0.574228 145.42Z" fill="#FFF4F2" />
        </svg>
        <h1>What do we do ?</h1>
        <h4>We are India’s first women-driven logistics company focusing on creating equal work opportunities for women. By partnering with major e-commerce companies in the nation, we aim to provide dignified employment to women from resource-poor communities.</h4>
        <div className='home-what-do-we-do_sub-container'>    
          <CircleComponent componentClicked={handleQuartleCircleClicked}/>    
          {selectedQuarter !== null && (
            <div className='home-what-do-we-do_sub-container_info'>
              <span>{quarters[selectedQuarter - 1].name}</span>
              <span>{quarters[selectedQuarter - 1].info}</span>
              <button >Read More <FaArrowRight /></button>
            </div>
          )}
        </div>
      </div>
      <div className='home-why-is-it-important-container'>
        <h1>Why it is important ?</h1>
        <div className='home-why-is-it-important-container__container-image'>
          <FaArrowCircleLeft onClick={prevSlide} style={{cursor:'pointer'}}/>
          {slides.map((slide, index) => {
            return (
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}
              >
                {index === current && (
                  <img src={slide.image} alt='travelimg' className='home-why-is-it-important-container_image' />
                )}
              </div>
            );
          })}
          <FaArrowCircleRight onClick={nextSlide} style={{cursor:'pointer'}}/>
        </div>
        <div className='home-why-is-it-important-container__container-mission-vision'>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="138" height="142" viewBox="0 0 138 142" fill="none">
            <path d="M131.1 14.1138H124.2V7.05692C124.2 3.15656 121.11 0 117.3 0C113.49 0 110.4 3.15656 110.4 7.05692V17.7658C106.579 20.6831 102.892 23.7366 99.311 26.8996C88.9258 18.9104 76.0656 14.1138 62.1 14.1138C27.8594 14.1138 0 42.6033 0 77.6261C0 112.649 27.8594 141.138 62.1 141.138C96.3406 141.138 124.2 112.649 124.2 77.6261C124.2 63.3422 119.51 50.1895 111.699 39.5688C114.791 35.9063 117.777 32.1358 120.629 28.2277H131.1C134.91 28.2277 138 25.0711 138 21.1707C138 17.2704 134.91 14.1138 131.1 14.1138ZM110.4 77.6261C110.4 104.862 88.7333 127.024 62.1 127.024C35.4667 127.024 13.8 104.862 13.8 77.6261C13.8 50.3906 35.4667 28.2277 62.1 28.2277C72.0063 28.2277 81.2192 31.3024 88.892 36.5555C86.8848 38.5082 84.8886 40.4721 82.9152 42.4593C81.4931 43.9194 80.0993 45.4077 78.6966 46.8869C73.75 44.0803 68.1465 42.3415 62.1 42.3415C43.0781 42.3415 27.6 58.1716 27.6 77.6261C27.6 97.0806 43.0781 112.911 62.1 112.911C81.1219 112.911 96.6 97.0806 96.6 77.6261C96.6 71.4421 94.8998 65.7112 92.155 60.6521C93.602 59.2174 95.0572 57.7919 96.4841 56.3375C98.4271 54.3192 100.347 52.2776 102.257 50.2241C107.394 58.0721 110.4 67.4952 110.4 77.6261ZM82.8 77.6261C82.8 89.3003 73.5147 98.7968 62.1 98.7968C50.6853 98.7968 41.4 89.3003 41.4 77.6261C41.4 65.9518 50.6853 56.4553 62.1 56.4553C64.486 56.4553 66.743 56.9536 68.8779 57.7164C64.7896 62.4826 60.8642 67.4154 57.221 72.6361C55.5402 75.0531 55.4415 78.3988 57.221 80.9485C59.4656 84.1643 63.834 84.9109 66.979 82.616C72.0836 78.89 76.9067 74.8753 81.567 70.6941C82.3129 72.8775 82.8 75.1858 82.8 77.6261Z" fill="#F79F2D"/>
            </svg>
            <h1>Mission</h1>
            <h3>Provide equal access to public spaces to women, Increase labor force participation for women in India and Challenge existing gender norms by employing women in professions which have been traditionally inaccessible to them.</h3>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="135" height="140" viewBox="0 0 135 140" fill="none">
              <g clip-path="url(#clip0_710_316)">
                <path d="M134.452 67.9015C103.57 13.1138 31.4297 13.0275 0.548482 67.9015C0.178209 68.5578 -0.0167236 69.3023 -0.0167236 70.0602C-0.0167236 70.8181 0.178209 71.5626 0.548482 72.2189C2.32173 75.3502 4.26542 78.3772 6.37036 81.2854C6.70276 81.739 7.11922 82.1211 7.59593 82.41C8.07265 82.6989 8.60029 82.8888 9.14874 82.969C9.69718 83.0492 10.2557 83.018 10.7924 82.8773C11.3291 82.7366 11.8334 82.4891 12.2766 82.1489C12.7198 81.8087 13.0932 81.3825 13.3755 80.8947C13.6578 80.4068 13.8434 79.8668 13.9217 79.3056C14.0001 78.7443 13.9696 78.1727 13.8321 77.6235C13.6946 77.0743 13.4528 76.5581 13.1204 76.1046C11.7282 74.2049 10.4204 72.1757 9.11255 70.0602C15.0345 60.0386 23.1874 51.5915 32.9063 45.4079C27.9352 52.638 25.2673 61.2628 25.2673 70.1034C25.2673 78.9439 27.9352 87.5687 32.9063 94.7989C29.8366 92.8898 26.9168 90.739 24.1735 88.3659C23.7524 87.9974 23.2646 87.7174 22.7378 87.5418C22.211 87.3662 21.6555 87.2985 21.1032 87.3426C20.5508 87.3867 20.0123 87.5417 19.5185 87.7988C19.0247 88.0559 18.5852 88.41 18.225 88.8409C17.8649 89.2718 17.5913 89.771 17.4197 90.3101C17.2481 90.8493 17.182 91.4177 17.2251 91.983C17.2682 92.5483 17.4197 93.0993 17.6709 93.6047C17.9221 94.1101 18.2681 94.5599 18.6891 94.9284C52.0172 124.157 107.536 119.797 134.367 72.2189C134.75 71.5702 134.96 70.8297 134.975 70.0718C134.99 69.3139 134.809 68.5654 134.452 67.9015ZM33.75 70.0602C33.75 63.229 35.7294 56.5512 39.4379 50.8713C43.1464 45.1914 48.4175 40.7644 54.5845 38.1502C60.7515 35.536 67.5375 34.852 74.0843 36.1847C80.6312 37.5174 86.6449 40.807 91.3649 45.6374C96.0849 50.4677 99.2993 56.622 100.602 63.322C101.904 70.0219 101.235 76.9666 98.681 83.2778C96.1265 89.589 91.8007 94.9832 86.2505 98.7784C80.7004 102.574 74.1752 104.599 67.5 104.599C58.549 104.599 49.9645 100.96 43.6352 94.4831C37.3058 88.0057 33.75 79.2206 33.75 70.0602ZM102.094 94.7125C107.012 87.4768 109.647 78.8741 109.647 70.0602C109.647 61.2464 107.012 52.6436 102.094 45.4079C111.813 51.5915 119.966 60.0386 125.888 70.0602C119.966 80.0818 111.813 88.529 102.094 94.7125Z" fill="#F79F2D"/>
                <path d="M67.5 18.2515C66.3811 18.2515 65.3081 17.7966 64.5169 16.987C63.7257 16.1773 63.2812 15.0792 63.2812 13.9341V5.29932C63.2812 4.15428 63.7257 3.05614 64.5169 2.24647C65.3081 1.4368 66.3811 0.981934 67.5 0.981934C68.6189 0.981934 69.6919 1.4368 70.4831 2.24647C71.2743 3.05614 71.7187 4.15428 71.7187 5.29932V13.9341C71.7187 15.0792 71.2743 16.1773 70.4831 16.987C69.6919 17.7966 68.6189 18.2515 67.5 18.2515ZM37.9687 22.5689C35.7328 22.5689 35.1422 21.4464 30.7547 16.9995C30.3613 16.5969 30.0493 16.119 29.8364 15.5931C29.6236 15.0671 29.514 14.5034 29.514 13.9341C29.514 13.3648 29.6236 12.8011 29.8364 12.2752C30.0493 11.7492 30.3613 11.2713 30.7547 10.8688C31.148 10.4662 31.615 10.1469 32.1289 9.92904C32.6429 9.71118 33.1937 9.59905 33.75 9.59905C34.3063 9.59905 34.8571 9.71118 35.3711 9.92904C35.885 10.1469 36.352 10.4662 36.7453 10.8688L40.9641 15.1862C41.559 15.79 41.9648 16.5616 42.1296 17.4024C42.2944 18.2432 42.2109 19.1151 41.8895 19.9071C41.5682 20.6991 41.0237 21.3753 40.3254 21.8493C39.6271 22.3234 38.8067 22.5739 37.9687 22.5689ZM97.0312 22.5689C96.1933 22.5739 95.3729 22.3234 94.6746 21.8493C93.9763 21.3753 93.4318 20.6991 93.1105 19.9071C92.7891 19.1151 92.7056 18.2432 92.8704 17.4024C93.0352 16.5616 93.441 15.79 94.0359 15.1862L98.2547 10.8688C99.0491 10.0558 100.127 9.59905 101.25 9.59905C102.373 9.59905 103.451 10.0558 104.245 10.8688C105.04 11.6817 105.486 12.7844 105.486 13.9341C105.486 15.0838 105.04 16.1865 104.245 16.9995C99.7734 21.5759 99.225 22.5689 97.0312 22.5689ZM67.5 139.138C66.3811 139.138 65.3081 138.684 64.5169 137.874C63.7257 137.064 63.2812 135.966 63.2812 134.821V126.186C63.2812 125.041 63.7257 123.943 64.5169 123.133C65.3081 122.324 66.3811 121.869 67.5 121.869C68.6189 121.869 69.6919 122.324 70.4831 123.133C71.2743 123.943 71.7187 125.041 71.7187 126.186V134.821C71.7187 135.966 71.2743 137.064 70.4831 137.874C69.6919 138.684 68.6189 139.138 67.5 139.138ZM33.75 130.504C32.9121 130.509 32.0916 130.258 31.3933 129.784C30.6951 129.31 30.1505 128.634 29.8292 127.842C29.5079 127.05 29.4243 126.178 29.5891 125.337C29.754 124.496 30.1597 123.725 30.7547 123.121L34.9734 118.804C35.3668 118.401 35.8338 118.082 36.3477 117.864C36.8616 117.646 37.4125 117.534 37.9687 117.534C38.525 117.534 39.0759 117.646 39.5898 117.864C40.1037 118.082 40.5707 118.401 40.9641 118.804C41.3574 119.206 41.6694 119.684 41.8823 120.21C42.0952 120.736 42.2048 121.3 42.2048 121.869C42.2048 122.438 42.0952 123.002 41.8823 123.528C41.6694 124.054 41.3574 124.532 40.9641 124.934C36.4922 129.511 35.9437 130.504 33.75 130.504ZM101.25 130.504C99.0141 130.504 98.4234 129.381 94.0359 124.934C93.2415 124.121 92.7952 123.019 92.7952 121.869C92.7952 120.719 93.2415 119.617 94.0359 118.804C94.8303 117.991 95.9078 117.534 97.0312 117.534C98.1547 117.534 99.2321 117.991 100.027 118.804L104.245 123.121C104.84 123.725 105.246 124.496 105.411 125.337C105.576 126.178 105.492 127.05 105.171 127.842C104.849 128.634 104.305 129.31 103.607 129.784C102.908 130.258 102.088 130.509 101.25 130.504Z" fill="black"/>
                <path d="M88.2985 57.7556C87.5813 55.7265 87.8766 56.4173 69.736 44.8035C69.0655 44.3746 68.2907 44.1472 67.5 44.1472C66.7094 44.1472 65.9346 44.3746 65.2641 44.8035C47.1235 56.4173 47.5875 55.8128 46.8282 57.4534C46.0688 59.094 46.4063 57.4534 46.4063 80.8537C46.4048 81.5874 46.5862 82.3094 46.9331 82.9515C47.28 83.5936 47.7811 84.1346 48.3891 84.5235C67.0782 96.4826 64.9266 95.1011 65.6438 95.4896C66.2133 95.8071 66.8515 95.9734 67.5 95.9734C68.1486 95.9734 68.7867 95.8071 69.3563 95.4896C70.1578 95.0579 68.2594 96.2668 86.611 84.5235C87.2189 84.1346 87.7201 83.5936 88.067 82.9515C88.4139 82.3094 88.5952 81.5874 88.5938 80.8537C88.5938 57.4103 88.5938 58.9213 88.2985 57.7556ZM67.5 53.4383L76.4016 59.1372L67.5 64.9657L58.5985 59.2667L67.5 53.4383ZM54.8438 67.038L63.2813 72.4348V83.8759L54.8438 78.695V67.038ZM71.7188 83.8759V72.4348L80.1563 67.038V78.695L71.7188 83.8759Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_710_316">
                  <rect width="135" height="138.157" fill="white" transform="translate(0 0.981934)"/>
                </clipPath>
              </defs>
            </svg>
            <h1>Vision</h1>
            <h3>To build an inclusive society by creating equal livelihood opportunities for women.</h3>
            </div>
        </div>
        <div className='important-rectangle-line'/>
        <div className='important-rectangle-line-2'/>
      </div>
      <div className='home-partners-container'>
        <img src={IndianMap} alt='indian-map'/>
        <div>
          <h1>Our Partners</h1>
          <img src={Partners} alt='partners'/>
        </div>
      {/* <LocationMap/> */}
          
      </div>
      
    </div>
  )
}

export default Home
