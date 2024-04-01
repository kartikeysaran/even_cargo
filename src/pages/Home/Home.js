import React , {useState} from 'react'
import './Home.css'
import { IoCloseCircle } from "react-icons/io5";
// import Important1 from '../../assets/important-1.jpeg';
// import Important2 from '../../assets/important-2.png';
// import Important3 from '../../assets/important-3.png' ;
import IndianMap from '../../assets/image/map.png';
import partnerBusiness from '../../assets/partner/business.png';
import partnerKnowledge from '../../assets/partner/knowledge.png';
import partnerFunding from '../../assets/partner/funding.png';
import partnerResource from '../../assets/partner/resoure.png';
import BlogCarousel from '../../components/BlogCarousel/BlogCarousel';
import a from '../../assets/video/delivering-happiness.mp4'
import deliveryTeam from '../../assets/image/delivery-team.jpg'
import { FaTruckFast } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import mobilize from '../../assets/image/mobilize.png'
import retrain from '../../assets/image/retrain.png'
import train from '../../assets/image/train.png'
import employ from '../../assets/image/employ.png'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // const quarters = [
  //   { id: 1, name: 'Mobilization', info: 'Our priority is to identify and mobilize women belonging to resource-poor communities. There is enough evidence that points...' },
  //   { id: 2, name: 'Training', info: 'After identifying our batch of women, the training team provides extensive training that focuses on learning about logistics, two-wheeler driving, self-defense and soft-skill development...' },
  //   { id: 3, name: 'Employment', info: 'Trainees are employed with our e-commerce and logistics partners. We ensure that our delivery associates are employed at hubs that are close to their homes, and are given an assured sum of load on routes that are safe...' },
  //   { id: 4, name: 'Retention', info: 'Women face immense challenges from different fronts - the family, the community, and the delivery hubs. As it will still take us a long time to bring definitive change in the mindsets around “gender-specific” jobs...' },
  // ];

  const facts = [
    { id: 1, title: "Girls trained on mobility", count: "2000"},
    { id: 2, title: "Girls trained on self defence", count: "1500"},
    { id: 3, title: "Dignified livelihood generated", count: "600"},
  ];

  const partners = [
    {id: 1, type: "Business Partner", img: partnerBusiness},
    {id: 2, type: "Funding Partner", img: partnerFunding},
    {id: 3, type: "Knowledge Partner", img: partnerKnowledge},
    {id: 4, type: "Resource Partner", img: partnerResource}
  ];

  const handleClick = () => {
    navigate('/service');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  //const [selectedQuarter, setSelectedQuarter] = useState(1);

  // const handleQuarterClick = (quarterId) => {
  //   setSelectedQuarter(quarterId);
  // };

  // const handleQuartleCircleClicked = (section) => {
  //   console.log(`Clicked ${(section/90)+1}`)
  //   handleQuarterClick((section/90)+1);
  // };

  // const openPopup = () => {
  //   setShowPopup(true);
  // };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  return (
    <div className='home-parent-container'>
      <div className='home-main-container'>
        <video autoPlay muted loop>
          <source src={a} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='home-main-center-text'>
          <h1>Equality Delivered</h1>
          <h2>At your doorsteps</h2>
          <button onClick={() => setShowPopup(true)}>Our Story</button>
        </div>
        {showPopup && (
          <div className="popup">
            <button className="close-button" onClick={() => setShowPopup(false)}>
              <IoCloseCircle />
            </button>
            <iframe
              title="YouTube Video"
              style={{ padding: '20px', width: '90%', height: '90%', margin: 'auto' }}
              src="https://www.youtube.com/embed/WzS-nYVRJmw"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <div className='home-what-do-we-do-container'>
        <img src={deliveryTeam} alt="Delivery Team" />
        <h2 style={{ textAlign: 'start', marginLeft: '5rem', color: 'white' }}>
          India’s first <br />
          <span style={{ color: '#F79F2D' }}>Women - Driven <br />
          logistics company <br /></span>
          Creating equal work <br />opportunities for <br />Women.
        </h2>
      </div>

      <div class='home-what-do-we-do-container-2'>
        <div class='home-what-do-we-do-container-2-vision'>
          <h2>Vision</h2>
          <span>
          We envision a 
          gender-inclusive society 
          by creating equal livelihood
          opportunities for women.
          </span>
        </div>
        <div class='home-what-do-we-do-container-2-mission'>
          <h2>Mission</h2>
          <span>
          <ul>
            <li> • Provision of equal access to public spaces</li>
            <li> • Increasing women labour-force participation</li>
            <li> • Challenging gender norms by employing women in traditionally male-dominated sectors</li>
          </ul>
          </span>
        </div>
      </div>

      <div className='home-what-do-we-do-container-operation'>
        <h2>
          <FaTruckFast color='#297EEB'  style={{ marginRight: '20px' }}/> 
          <span className="operation-text">Operati</span>on mode
        </h2>
        <div className='home-what-do-we-do-container-operation-mobilize-left'>
          <div className='home-what-do-we-do-container-operation-mobilize-outer'>
            <img src={mobilize}/>
          <div className='home-what-do-we-do-container-operation-mobilize'>
            <h2><span className='circle-number'>1</span> Mobilize</h2>
            <p>We identify and mobilize women from resource poor communities.....</p>
            <button className='read-more' onClick={handleClick}>Read More <FaArrowRight /></button>
          </div>
          </div>
          <div className='home-what-do-we-do-container-operation-mobilize-invisible'>
            <h2><span className='circle-number'>1</span> Mobilize</h2>
            <p>We identify and mobilize women from resource poor communities.....</p>
            <button>Read More <FaArrowRight /></button>
          </div>
        </div>
        
        <div className='home-what-do-we-do-container-operation-arrow'/>

        <div className='home-what-do-we-do-container-operation-mobilize-right'>
        <div className='home-what-do-we-do-container-operation-mobilize-invisible'>
            <h2><span className='circle-number'>1</span> Mobilize</h2>
            <p>We identify and mobilize women from resource poor communities.....</p>
            <button>Read More <FaArrowRight /></button>
          </div>
          <div className='home-what-do-we-do-container-operation-mobilize-outer'>
            <img src={train}/>
          <div className='home-what-do-we-do-container-operation-mobilize'>
            <h2><span className='circle-number'>2</span> Train</h2>
            <p>We do need assessment and prepare skill metrics to curate the training needs of women.......</p>
            <button className='read-more'  onClick={handleClick}>Read More <FaArrowRight /></button>
          </div></div>
        
        </div>
        
        <div className='home-what-do-we-do-container-operation-arrow-inverted'/>

        <div className='home-what-do-we-do-container-operation-mobilize-left'>
        <div className='home-what-do-we-do-container-operation-mobilize-outer'>
            <img src={employ}/>
          <div className='home-what-do-we-do-container-operation-mobilize'>
            <h2><span className='circle-number'>3</span> Employ</h2>
            <p>We provide dignified employment to women in the logistics sector......</p>
            <button className='read-more' onClick={handleClick}>Read More <FaArrowRight /></button>
          </div>
          </div>
          <div className='home-what-do-we-do-container-operation-mobilize-invisible'>
            <h2><span className='circle-number'>1</span> Mobilize</h2>
            <p>We identify and mobilize women from resource poor communities.....</p>
            <button className='read-more'>Read More <FaArrowRight /></button>
          </div>
        </div>
        
        <div className='home-what-do-we-do-container-operation-arrow'/>
          
        <div className='home-what-do-we-do-container-operation-mobilize-left'>
        <div className='home-what-do-we-do-container-operation-mobilize-invisible'>
            <h2><span className='circle-number'>1</span> Mobilize</h2>
            <p>We identify and mobilize women from resource poor communities.....</p>
            <button className='read-more'>Read More <FaArrowRight /></button>
          </div>
          <div className='home-what-do-we-do-container-operation-mobilize-outer'>
            <img src={retrain}/>
          <div className='home-what-do-we-do-container-operation-mobilize right'>
            <h2><span className='circle-number'>4</span> Retain</h2>
            <p>We work with women and address their workplace related concerns post-employment to ensure that they stay.....</p>
            <button className='read-more'  onClick={handleClick}>Read More <FaArrowRight /></button>
          </div>
          </div>
        </div>
        
      </div>

      <div className='home-why-is-it-important-container'>
        {/* <h1>Why it is important ?</h1>
        <div className='home-why-is-it-important-container__container-image'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img width="100" height="100" src="https://img.icons8.com/ios/100/weight-care.png" alt="weight-care" />
            <h3>Equitable<br /> Society</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3>More Labourforce<br /> Participation</h3>
            <img width="100" height="100" src="https://img.icons8.com/ios/100/strength.png" alt="strength" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img width="100" height="100" src="https://img.icons8.com/ios/100/good-quality--v1.png" alt="good-quality--v1" />
            <h3>Sustainable <br />livelihood</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3>Financial <br />Independence</h3>
            <img width="100" height="100" src="https://img.icons8.com/external-itim2101-lineal-itim2101/100/external-Financial-Freedom-business-and-financial-itim2101-lineal-itim2101.png" alt="external-Financial-Freedom-business-and-financial-itim2101-lineal-itim2101" />
          </div>
        </div> */}

        <div className='home-facts-outer'>
          {facts.map((fact) => (
            <div key={fact.id} className='home-facts-card'>
              <h3 className='home-facts-count-span'>{fact.count}+</h3>
              <h3 className='home-facts-title-span'>{fact.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className='home-map-container'>
        <h2>
          <span className="operation-text">Even Carg</span>o Presence
        </h2>
        <img style={{ background: 'rgba(255, 255, 255, 0.8)', height: '100%', width:'35%'}} src={IndianMap} alt='indian-map' />
        <div>
          {/* <h1>Our Partners</h1>
          <img src='' alt='partners' style={{ transform: 'scaleX(-1)' }}/> */}
        </div>
        {/* <LocationMap/> */}
      </div>

      <div className='home-our-partners-container'>
        <h1>See who is talking about us</h1>
        <div className='home-our-partners-container-outer'>
          <BlogCarousel />
        </div>
      </div>

      <div className='home-our-partners-container'>
        <h1>Our Partners</h1>
        <div className='home-our-partners-container-outer'>
          {partners.map((partner, index) => (
            <React.Fragment key={partner.id}>
              <div className='home-our-partners-container-box'>
                <p className='home-our-partners-container-p'>{partner.type}</p>
                <img className='home-our-partners-container-img' src={partner.img} alt='partner-img' />
              </div>
              {index !== partners.length - 1 && <div className='home-our-partners-sep'></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Home;