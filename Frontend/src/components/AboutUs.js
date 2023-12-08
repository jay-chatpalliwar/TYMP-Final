import React from "react";

const AboutUs = () => {

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-10/12 lg:w-1/2 ">
          <img
            className="w-10/12 h-10/12"
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of People"
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-white">
            About Us
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            We are dedicated to revolutionizing education by providing a Student
            Performance Evaluation Portal that bridges the gap between teachers
            and students. Our mission is to empower educators and students with
            data-driven insights, fostering academic excellence, growth, and
            achievement throughout the learning journey.
          </p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-white">
            Our Story
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            In the dynamic landscape of education, the genesis of our "Student
            Performance Evaluation" project unfolds as a response to the
            evolving needs of learners and educators alike. Rooted in a
            commitment to excellence, our story is one of innovation,
            empowerment, and a relentless pursuit of educational advancement.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-6 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden w-[200px] h-[160px] object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gradesarthi.appspot.com/o/files%2Fphoto1.jpg?alt=media&token=cd90dac0-c60e-4c38-9d4c-e9e90f701e93"
                alt="Alexa featured Img"
              />
              {/* <img
                className="md:hidden block"
                src=".../public/pictures/photo1.jpg"
                alt="Alexa featured Img"
              /> */}
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-white">
                Bhupendra
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                // className='w-[200px] h-[200px]'
                className="md:block hidden w-[200px] h-[160px] object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/gradesarthi.appspot.com/o/files%2Fphoto.jpg?alt=media&token=b13974cb-c57e-4889-820a-221d83a75c3f"
                alt="Olivia featured Img"
              />
              {/* <img
                className="md:hidden block"
                src="https://firebasestorage.googleapis.com/v0/b/gradesarthi.appspot.com/o/files%2Fphoto.jpg?alt=media&token=b13974cb-c57e-4889-820a-221d83a75c3f"
                alt="Olivia featured Img"
              /> */}
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-white">
                Jay
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="https://firebasestorage.googleapis.com/v0/b/gradesarthi.appspot.com/o/files%2Fphoto2.jpg?alt=media&token=6d240f30-8926-4537-a281-b1830ee61d39"
                alt="Sourabh featued Img"
              />
              {/* <img
                className="md:hidden block"
                src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                alt="Liam featued Img"
              /> */}
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-white">
                Sourabh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
