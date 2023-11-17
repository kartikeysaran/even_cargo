import React from 'react'
import './Service.css'
import Service1 from '../../assets/service/service1.jpg';
import Service2 from '../../assets/service/service2.jpg';
import Service3 from '../../assets/service/service3.jpg';
import Service4 from '../../assets/service/service4.jpg';
import Service5 from '../../assets/service/service5.jpg';
import Service6 from '../../assets/service/service6.jpg';
import Service7 from '../../assets/service/service7.jpg';
import BarChart from '../../components/BarChart/BarChart';

const Service = () => {

  const keyFeatures = [
    {
      title: 'Mobilization',
      details: 'Our priority is to identify and mobilize women belonging to resource-poor communities. There is enough evidence that points towards their exploitative and unpaid labour due to lack of access to formal and dignified employment. This lost opportunity is caused due to patriarchal notions of work and its roles. Their inclusion into our workforce not only supports them financially, but also helps us consistently challenge the deep rooted ideas of access to employment.',
      image: Service4
    },
    {
      title: 'Training',
      details: 'After identifying our batch of women, the training team provide an extensive training that focuses on learning about logistics, two-wheeler driving, self-defense and soft-skill development. Trainees are placed with our current workforce to learn on-the-job, allowing us to ensure that have a faster and an in-depth learning experience. For the first two months, we support our trainees financially, through provision of a basic income as well as support to purchase their own two-wheeler and smartphone.',
      image: Service5
    },
    {
      title: 'Employment',
      details: 'Trainees are employed with our e-commerce and logistics partners. We ensure that our delivery associates are employed at hubs that are close to their homes, and are given an assured sum of load in routes that are safe and familiar to them. Our priority is efficient delivery, keeping in mind the safety of our delivery associates. For this, we ensure that our associates only work during the day. This is a constantly evolving process for us as we work collaboratively with our partners to make the logistics space more inclusive for our delivery associates.',
      image: Service6
    },
    {
      title: 'Retention',
      details: 'Women face immense challenges from different front - the family, the community and the delivery hubs. As it will still take us a long time to bring definitive change in the mindsets around “gender-specific” jobs, our women riders still fear harassment and mistreatment in their workspaces as well as their homes. This has an adverse impact on their mental and physical well-being, which also leads to drop-outs. One of our priorities is to providing a safe space to our riders through interventions and support whenever and wherever necessary. Their retention will ensure economic and financial growth and stability.',
      image: Service7
    },
  ]

  const employmentData = [
    { year: 2016, numWomenEmployed: 100 },
    { year: 2023, numWomenEmployed: 500 },
  ];

  return (
    <div className='service-container'>
      <div className='service-container__header'>
        <svg xmlns="http://www.w3.org/2000/svg" width="420" height="295" viewBox="0 0 420 295" fill="none" className='service-container__header-svg1'>
          <path d="M-53.3554 178.986C-69.6764 98.8256 -58.0507 16.5305 83.0715 1.62184C224.194 -13.2868 402.198 157.827 418.519 237.988C434.84 318.149 283.298 277.001 142.175 291.91C1.05309 306.819 -37.0343 259.147 -53.3554 178.986Z" fill="#FFF4F2" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="392" height="570" viewBox="0 0 392 570" fill="none" className='service-container__header-svg2'>
          <path d="M5.64463 345.644C-10.6764 190.231 0.949287 30.6808 142.072 1.7764C283.194 -27.128 461.198 304.621 477.519 460.034C493.84 615.446 342.298 535.671 201.175 564.575C60.0531 593.48 21.9657 501.057 5.64463 345.644Z" fill="#FFF4F2" />
        </svg>
        <h3>It is possible to achieve gender equity within our lifetime.</h3>
        <div className='service-container__header_img-container'>
          <img src={Service1} alt='Service1' className='service-container__header_img1' />
          <img src={Service2} alt='Service2' className='service-container__header_img2' />
          <img src={Service3} alt='Service3' className='service-container__header_img3' />
        </div>
      </div>
      <div className='service-container__body'>
        <h1>Discover the Key Features</h1>
        {keyFeatures.slice(0, 2).map((feature, index) => (
          <div className="service-container__body-item" key={index}>
            <div className="service-container__body-text-container">
              <span>{feature.title}</span>
              <p>{feature.details}</p>
            </div>
            <div className="service-container__body-image-container">
              <img src={feature.image} alt={feature.title} />
            </div>
          </div>
        ))}
        <div className='service-container__body-fact'>700+ women trained</div>
        {keyFeatures.slice(2, 3).map((feature, index) => (
          <div className="service-container__body-item" key={index}>
            <div className="service-container__body-text-container">
              <span>{feature.title}</span>
              <p>{feature.details}</p>
            </div>
            <div className="service-container__body-image-container">
              <img src={feature.image} alt={feature.title} />
            </div>
          </div>
        ))}
        <div className='service-container__barchart'>
          <BarChart data={employmentData} />
        </div>
        {keyFeatures.slice(3, 4).map((feature, index) => (
          <div className="service-container__body-item" key={index}>
            <div className="service-container__body-text-container">
              <span>{feature.title}</span>
              <p>{feature.details}</p>
            </div>
            <div className="service-container__body-image-container">
              <img src={feature.image} alt={feature.title} />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Service