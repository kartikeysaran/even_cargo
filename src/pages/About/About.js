import React, { useState } from 'react';
import './About.css'
import { FaArrowRight } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import labiba from '../../assets/team/labiba.jpg'
import priyanka from '../../assets/team/priyanka.jpg'
import yogesh from '../../assets/team/yogesh.png'
import shivani from '../../assets/team/shivani.jpg'
import srishti from '../../assets/team/srishti.jpg'
import mubeena from '../../assets/team/mubeena.jpg'

import satyajit from '../../assets/mentors/satyajit.png'
import karen from '../../assets/mentors/karen.png'
import sudarshan from '../../assets/mentors/sudarshan.png'
import Important1 from '../../assets/important-1.jpeg';
import Important2 from '../../assets/important-2.png';
import Important3 from '../../assets/important-3.png' ;
import { FaArrowCircleRight, FaArrowCircleLeft} from "react-icons/fa";

const About = () => {
  const our_story_text = [
    "The seed of what Even Cargo is today started with many questions - what is women empowerment when the reality is starkly the opposite? Why are women still unable to access spaces and opportunities that are rightfully theirs? Is there a way to strengthen the possibilities of change by becoming a better ally? The story of Even Cargo is a story of overcoming hurdles at every junction. With the idea of bringing visible change, the team of volunteer individuals set out to different resource-poor communities across the city of Delhi in search of potential women delivery associates. The proposition was simple - get the opportunity to be trained and join a workforce that can assure the dignity of work and a assured income. The problems, however, were much more complicated...",
    "The seed of what Even Cargo is today started with many questions - what is women empowerment when the reality is starkly the opposite? Why are women still unable to access spaces and opportunities that are rightfully theirs? Is there a way to strengthen the possibilities of change by becoming a better ally? The story of Even Cargo is a story of overcoming hurdles at every junction. With the idea of bringing visible change, the team of volunteer individuals set out to different resource-poor communities across the city of Delhi in search of potential women delivery associates. The proposition was simple - get the opportunity to be trained and join a workforce that can assure the dignity of work and a assured income. The problems, however, were much more complicated. Women cannot become delivery partners! They won't be able to sustain in this industry as it is physically demanding. Our many stakeholders, from women and their family members and the logistics industry, had notions rooted in the patriarchal set-up of what women should and should not do. The visibility of women in the logistics space was zero, owing to the idea that this kind of work is not meant for women. These statements only made the team more determined to break that notion. And in 2016, with a small number of delivery associates, the process of change began. We saw changes in the confidence of our delivery associates, but also in the mindset of our logistics partners, who became willing to bring inclusivity to their systems. The last seven years have taught us important lessons of leadership, of solidarity and of the power of allyship. We started with a what if women became delivery associates? and we want to reach a stage where this is not even a question anymore. The smile on the face of our associates is why we do what we do! And we will not stop until we fulfill our vision of gender equity. -Team Even Cargo"
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

  const journeyData = [
    {
      date: '2016',
      event: 'Company Founded by Yogesh',
      description: 'After several attempts at starting enterprises, focusing on breaking patriarchal notions surrounding roles in work.',
    },
    {
      date: '2016',
      event: 'Formation of the First Team',
      description: 'Young ladies Richa Sahijani and Jainy Sethia began laying the foundation of the company through intensive mobilization and identification processes.',
    },
    {
      date: 'Next 7 Years',
      event: 'Partnerships and Recognition',
      description: 'Media coverage and recognition set the path to partnerships with different stakeholders - from e-commerce and logistics companies to CSRs and investors.',
    },
    {
      date: 'Next 7 Years',
      event: 'Breaking Barriers',
      description: 'Even Cargo broke the barriers of discrimination by training more than 500 women and providing employment to more than 100 women as delivery partners across 7 cities in India.',
    },
  ];

  const teamMembers = [
    {
      name: 'Priyanka Yadav',
      img: priyanka,
      position: 'Operations-Manager',
    },
    {
      name: 'Srishti Prateek',
      img: srishti,
      position: 'Business research (finances)',
    },
    {
      name: 'Labiba Sadiq',
      img: labiba,
      position: 'Human Resources',
    },
    {
      name: 'Shivani Attri',
      img: shivani,
      position: 'Community engagement & partnership',
    },
    {
      name: 'Mubeena Hussain',
      img: mubeena,
      position: 'Business research (policies)',
    },
    {
      name: 'Yogesh Kumar',
      img: yogesh,
      position: 'Strategy & Operations',
    },
  ]

  const mentors = [
    {
      name: 'Sudarshan Rodriguez',
      img: sudarshan,
      about: "Sudarshan Rodriguez has been working with the Tata Institute of Social Sciences in the Director's office handling incubation, innovative and multi-disciplinary projects such as...",
      about_more: "Sudarshan Rodriguez has been working with the Tata Institute of Social Sciences in the Director's office handling incubation, innovative and multi-disciplinary projects such as the TISS-LAHDC Ladakh Project, the Socio and Ecological Stewardship Programme, TISS Andaman Nicobar Initiative, National Water Mission -TISS Projects since 2010. As part of the TISS Fellowship Programme, where he coaches and mentors young development professionals on leadership development, systems and project management. Sudarshan started his career in 1998 with UNDP-India, New Delhi as a Programme Development Specialist on their Environment & GEF Programme."
    },
    {
      name: 'Satyajit Majumdar',
      img: satyajit,
      about: "Prof. Satyajit Majumdar is the chairperson of the centre for social entrepreneurship, Tata Institue of Social Sciences, Mumbai...",
      about_more: "Prof. Satyajit Majumdar is the chairperson of the centre for social entrepreneurship, Tata Institue of Social Sciences, Mumbai.He has worked at maintenance and project engineer with Coal India Limited for about 12 years and then joined the Quality Mission Project of Indian Statistical Institute. Later he took up teaching since 1998 to became Professor at the Center for Social Entrepreneurship of Tata Institute of Social Science, Mumbai (India). He also engaged in consulting and research. His research interest area is growth strategy in entrepreneur managed small organisations."
    },
    {
      name: 'Karen Tay',
      img: karen,
      about: "Karen is currently the Marketing Director of Classic Fine Foods. She was previously managing marketing and business development for...",
      about_more: "Karen is currently the Marketing Director of Classic Fine Foods. She was previously managing marketing and business development for METRO CASH & CARRY Asia region, of which the Indian market is a part of. Her other experiences include management consulting with BAIN & Company Southeast Asia and P&L responsibilities of the Pacific region for a German confectionery company. She currently resides in her native Singapore but has lived in the US, UK, Germany, China and Hong Kong. Karen is passionate about women and children issues."
    }
  ]

  const [showMoreAboutMentor, setShowMoreAboutMentor] = useState({});

  const handleToggleAboutMentor = (index) => {
    setShowMoreAboutMentor((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [showReadMore, setShowReadMore] = useState(true);
  const [storyText, setStoryText] = useState(our_story_text[0]);

  const handleReadMore = () => {
    setStoryText(our_story_text[1]);
    setShowReadMore(false);
  };

  

  return (
    <div className='about-container'>
      <h1>Pitfalls of the status quo</h1>
      <div className='about-container-rect'></div>
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
        <div className='spacer'/>
      <div className='about-container-our-story'>
      <svg xmlns="http://www.w3.org/2000/svg" width="1043" height="653" viewBox="0 0 1043 653" fill="none" className='about-container-pink-clouds'>
        <path d="M277.678 523.016C81.2145 386.838 -86.4457 221.232 49.8841 64.8471C186.214 -91.5377 777.269 68.9975 973.733 205.175C1170.2 341.353 897.671 401.606 761.341 557.991C625.011 714.376 474.141 659.194 277.678 523.016Z" fill="#FFF4F2"/>
      </svg>
        <h2>Our Story</h2>
        <h5>{storyText}</h5>
        {showReadMore && <button onClick={handleReadMore}>Read More <FaArrowRight /></button>}
      </div>
      <div className='spacer'/>
      <div className='about-container-our-journey'>
        <h2>The Journey</h2>
        <VerticalTimeline>
          {journeyData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={item.date}
              dateClassName="date-class"  // Add this line to apply the date class
              iconStyle={{ background: '#F79F2D', color: '#fff' }}
              icon={<i className="fas fa-briefcase"></i>}
          > 
              <p>{item.date}</p>
              <h3 className="vertical-timeline-element-title">{item.event}</h3>
              <p>{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <div className='spacer'/>
      <svg xmlns="http://www.w3.org/2000/svg" width="534" height="414" viewBox="0 0 534 414" fill="none" className='about-container-pink-clouds2'>
        <path d="M175.269 37.2435C313.971 -5.45531 463.283 -28.525 524.209 69.0108C585.136 166.547 323.946 362.443 185.244 405.142C46.5415 447.841 82.851 321.173 21.9244 223.637C-39.0022 126.101 36.5669 79.9423 175.269 37.2435Z" fill="#FFF4F2"/>
      </svg>
      <h2>Our Team</h2>
      <div className="team-container">
        {teamMembers.slice(0, 3).map((member, index) => (
          <div key={index} className="team-member-card-2">
            <img src={member.img} alt={member.name} className="team-member-image" />
            <h4 className="team-member-name">{member.name}</h4>
            <p className="team-member-position">{member.position}</p>
          </div>
        ))}
      </div>
      <div className="team-container">
        {teamMembers.slice(3, 6).map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.img} alt={member.name} className="team-member-image" />
            <h4 className="team-member-name">{member.name}</h4>
            <p className="team-member-position">{member.position}</p>
          </div>
        ))}
      </div>
      <div className='spacer'/>
      <h2>Our Advisors</h2>
      <div className="team-container">
        {mentors.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.img} alt={member.name} className="team-member-image" />
            <h4 className="team-member-name">{member.name}</h4>
            <p className="mentor-about">
              {showMoreAboutMentor[index] ? member.about_more : member.about}
            </p>
            <button onClick={() => handleToggleAboutMentor(index)}>
              {showMoreAboutMentor[index] ? 'Read Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;