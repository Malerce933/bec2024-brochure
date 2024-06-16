import Title from "./Title";
import Description from "./Description";
import ellipse from "/src/assets/ellipse.svg"

export default function WhatBec({ isMobile, innerRef }) {

    let backGroundOrange = <div className="bg-ellipse w-[416px] h-[413px] left-[-60%] transform rotate-[48.74deg] top-[-13%] absolute  z-10  filter blur-[70px] lg:opacity-0"> </div>
    let lines = <div className="absolute bg-lines1 bg-contain  bg-no-repeat w-[2300px] h-[1500px] z-0 left-[-37.5%] transform  top-[60%]"></div>
    let backGroundBlack1 = <div className="absolute bg-ellipse-black w-[1700.39px] rounded-full h-[460.22px] left-[-160%] top-[70%] z-10 filter blur-[70px] transform rotate-[-90.56deg]"></div>
    let backGroundBlack2 = <div className="absolute bg-ellipse-black w-[1700.39px] rounded-full h-[674.22px] left-[100%] top-[100%] z-10 filter blur-[70px] transform rotate-[-26.56deg]"></div>

    if (isMobile) {
        backGroundBlack1 = ""
        backGroundBlack2 = ""
        backGroundOrange = <div className="bg-ellipse w-[416px] h-[413px] left-[-60%] transform rotate-[48.74deg] top-[-56%] absolute  z-10  filter blur-[70px] lg:opacity-0"> </div>
        // lines = <div className="absolute  bg-mobile-lines   bg-no-repeat w-[1000px] h-[1100px] z-10 left-[0%] transform  top-[-80%]"></div>
    }


    return (
        <div ref={innerRef} className="what flex flex-col items-center self-center relative text-white px-[50px]   ">
            {backGroundOrange}
            {lines}
            {backGroundBlack1}
            {backGroundBlack2}






            <Title className="what__title relative z-20 text-center lg:mb-[54px]">ЩО ТАКЕ BEC?</Title>
            <div className="what__text text-center  relative z-20 lg:w-[724px]">
                <p className="  leading-[150%] mb-[10px]">Це змагання, що запрошують молодих інженерів застосувати свої знання та навички для вирішення реальних завдань в одній з двох категорій
                    — Case Study (CS) та Team Design (TD).</p>
                <p className="  leading-[150%] "></p>
                <p className="  leading-[150%]  mb-[24px]">Учасниками змагань є студенти, що зацікавлені у розв'язанні сучасних проблем та створенні інноваційних проєктів. Мета події — підвищення інтересу молоді до майбутнього розвитку інженерного напрямку. Це підніме рівень обізнаності галуззю та забезпечить наявність висококваліфікованих спеціалістів в Україні.</p>
            </div>

            <a target="_blank" rel="noopener noreferrer" href="https://bec-web-2023.vercel.app/" className=" items-center justify-center flex what__button transition-transform transform-gpu duration-[400ms] hover:scale-[1.1]  border-2  border-customOrange text-white py-[10px]">Дізнатись більше</a>
        </div>
    );
}