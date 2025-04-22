import React from 'react'

export default  function DesigningProcess() {
  return (
   <section className="creste-your-own">
     <div className="container pb-5 px-5">
       <div className="row align-items-center mx-5">
         <div className="col-6">
           <img
             src="images/create-your-unique-ring_640x.webp"
             alt=""
             className="img-fluid"
           />
         </div>
         <div className="col-6 ps-5">
           <div className="grid__item medium-up--one-half grid__item-content">
             <div className="content medium-up--text-left small--text-center">
               <h2 className="section-header-sm section-header-reverse section-header-sb">
                 SEE OUR DESIGN PROCESS
               </h2>
               <h2 className="section-header">Create Your Unique Engagement Ring</h2>
               <p>
                 We proudly specialize in designing and creating unique diamond engagement
                 rings. Our team of in-house gemologists and designers adhere to the
                 strictest quality control and attention to precise detail to ensure your
                 dream ring becomes a reality.
               </p>
               <div className="btn-wrapper flex flex-wrap justify-content_center">
                 <a
                   title="SHOP ENGAGEMENT RINGS"
                   href="#"
                   className="text-dark btn border-button border my-2 p-2 rounded-0 fw-bold border-dark"
                 >
                   Start with a setting
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
  )
}
