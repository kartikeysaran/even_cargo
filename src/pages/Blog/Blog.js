import React from 'react'
import './Blog.css'

const Blog = () => {
  const blogs = [
    {
      link: 'https://www.newyorker.com/business/currency/a-service-that-delivers-autonomy-to-women-in-india',
      headline: 'Company Hires Only Female Drivers to Help Women Reclaim Public Space in New Delhi',
      image: "https://ropercenter.cornell.edu/sites/default/files/styles/800x600/public/Images/New-York-Times-Logo8x6_0.png?itok=7YqGOSMA",
    },
    {
      link: 'http://www.makers.com/blog/tag/even-cargo',
      headline: 'Even Cargo: A New Perspective on Women in Logistics',
      image: 'https://s.yimg.com/cv/apiv2/default/makers_thumbnail.png',
    },
    {
      link: 'https://www.hindustantimes.com/delhi/breaking-into-male-bastion-delivery-girls-ride-their-way-to-freedom/story-HAcWxIyDzanhOMTiI6akQM.html',
      headline: 'Breaking into Male Bastion: Delivery Girls Ride Their Way to Freedom',
      image: 'https://www.medianews4u.com/wp-content/uploads/2020/08/HT-Media-Group-refreshes-its-flagship-brand-and-launches-the-all-new-Hindustan-Times.jpg',
    },
    {
      link: 'https://www.thequint.com/voices/women/meet-the-woman-who-delivers-your-amazon-myntra-jabong-package',
      headline: 'Meet the Woman Who Delivers Your Amazon, Myntra, Jabong Package',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/The_Quint_logo_with_purple_background.svg/640px-The_Quint_logo_with_purple_background.svg.png',
    },
    {
      link: 'http://beingindian.com/news/breaking-gender-stereotype/',
      headline: 'Breaking Gender Stereotypes: Women Empowerment in the Workplace',
      image: 'https://yt3.googleusercontent.com/1gqbSfw-0TPbv04FS0URu-Ri_Vp-U4xoYfCiJdY7MVDLtuyoSD3znel6sxqMtnaBz9zVg3Xo=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      link: 'https://www.news18.com/news/opinion/from-capacity-to-capability-bringing-more-women-in-logistics-and-transport-4844723.html',
      headline: 'From Capacity to Capability: Bringing More Women in Logistics and Transport',
      image: 'https://www.adgully.com/img/800/201811/news18-network.jpg'
    },
    {
      link: 'https://timesofindia.indiatimes.com/readersblog/yogeshspeaks/bringing-more-women-on-drivers-seat-42972/',
      headline: 'Bringing more women on driver’s seat',
      image: 'https://static.toiimg.com/photo/75476733.cms'
    }
    // {
    //   link: 'https://viralvilla.co/en/a-startup-in-delhi-hires-women-for-deliverly-of-goods/',
    //   headline: 'Delhi Startup Empowers Women Through Delivery Services',
    //   image: 'https://scontent.flko7-1.fna.fbcdn.net/v/t39.30808-6/308613437_437122185202798_8126828346400494450_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UbCjoQTMm5IAX-x3ccJ&_nc_ht=scontent.flko7-1.fna&oh=00_AfB5yp3XdCP_Dj2RucqJPQskIitFc1T4BhnR33qeJQtUqA&oe=655BFFED',
    // },
    // {
    //   link: 'http://www.postpickle.com/News/here-is-a-delhi-based-startup-trying-to-bring-about-gender-equality-by-giving-mens-jobs-to-women',
    //   headline: 'Delhi Startup Promotes Gender Equality by Hiring Women for Delivery Jobs',
    //   image: 'https://scontent.flko7-1.fna.fbcdn.net/v/t39.30808-6/339627977_240482788469779_3093861828028165496_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FHLNa3sUlMIAX99C1Yy&_nc_ht=scontent.flko7-1.fna&oh=00_AfA3FbkNdgxgrzLGQXUrB3QcIXnEtf5CcTdvjFFv6b10Fg&oe=655D40A7',
    // },
    // {
    //   link: 'https://womensvoicesforchange.org/delhi-company-hires-only-female-drivers-to-promote-independence-in-the-news.htm',
    //   headline: 'Delhi Company Promotes Independence by Hiring Female Drivers',
    //   image: 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png',
    // },
    // {
    //   link: 'http://www.wow.com/article/amifpz/20521',
    //   headline: "Empowering Women: Delhi Startup's Unique Approach to Employment",
    //   image: 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png',
    // },
    // {
    //   link: 'https://www.follownews.com/this-delivery-company-in-india-hires-only-women-27yge',
    //   headline: 'Breaking Stereotypes: Delivery Company in India Hires Only Women',
    //   image: 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png',
    // },
    
    // Add other blogs with links, headlines, and images
  ];
  return (
    <div className='blog-container'>
      <h1>Recent Blogs</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <a href={blog.link} target="_blank" rel="noopener noreferrer">
              <img src={blog.image} alt={`Blog ${index + 1}`} />
              <h2>{blog.headline}</h2>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog