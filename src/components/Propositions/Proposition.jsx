import React, { useState } from 'react';
import Points from "../Points";
import { useEffect } from 'react';
import { INFO_PROPOSITIONS, INFO_ADDITIONAL_PROPOSITIONS } from '../../data';

export function Proposition({ title, points, subInfo, price, addToBasket, isActive }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    let classBlock = "relative flex flex-col text-white  w-full lg:w-full lg:h-[515px] h-[454px] px-5 lg:px-[32px] bg-proposition-gradient p-5 mb-10 text-[12px] font-medium";
    let classButton = "font-workSans self-center box-border text-[24px] absolute left-1/2 bg-proposition-button transform translate-y-1/2 -translate-x-1/2 bottom-0 w-[112px] h-[42px] border-solid border-2 border-white flex justify-center items-center";

    if (isActive) {
        classBlock += " clicked";
        classButton += " clicked";
    }
    const proposition = INFO_PROPOSITIONS.find(item => item.title === title)
    return (
        <div id="proposition" className={classBlock}>
            <button
                className="transition-transform transform-gpu duration-[400ms] hover:scale-[1.2] border-solid border-[3px] border-white rounded-full text-white flex justify-center items-center self-end lg:absolute lg:top-[4%]"
                onClick={() => setIsModalVisible(true)}
            >
                i
            </button>
            <p className=" proposition__title text-[24px] font-daysOne uppercase mb-[12px]">{title}</p>
            <Points data={points}></Points>
            <div className="absolute transform -translate-y-[125%] bottom-0 inline-block w-auto border-solid border-[1px] border-customGray text-customGray text-[12px] p-[10px]">{subInfo}</div>
            <button onClick={() => addToBasket(title, price, false)} className={classButton}>{price}$</button>

            <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                {
                    <div className=' info-container text-white'>
                        <p className=' info-propo mb-2 font-daysOne'>{proposition.title}</p>
                        {
                            proposition.points.map((item, index) =>
                                <div key={index}>
                                    <p className=' info-title mb-2 font-daysOne'>{item.text}</p>
                                    <p className=' info-description mb-4'>{item.description}</p>
                                </div>
                            )
                        }

                    </div>
                }
            </Modal>
        </div>
    );
}

export function SubProposition({ text, price, addToBasket, handleRemoveProposition, isActive }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        if (isChecked) {
            handleRemoveProposition(text);
        } else {
            addToBasket(text, price, true);
        }
        setIsChecked(!isChecked);
    };

    let classBlock = "relative flex items-center justify-center text-white w-full lg:w-full p-[15px] bg-proposition-gradient  mb-[10px] lg:px-[32px] lg:py-[19px] text-[14px] transition-transform transform-gpu duration-[400ms]";
    let classButton = "font-workSans box-border text-[14px] lg:text-[20px] relative bg-proposition-button border-[1px] w-[52px] h-[24px] lg:w-[93px] lg:h-[32px] flex justify-center items-center self-center mr-3 lg:mr-5";

    if (isActive) {
        classBlock += " clicked";
        classButton += " clicked";
    }

    return (
        <>
            <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                {INFO_ADDITIONAL_PROPOSITIONS.map((info, index) =>
                    <div className=' info-container text-white' key={index}>
                        <p className=' info-title mb-2 font-daysOne'>{info.title}</p>
                        <p className=' info-description mb-4'>{info.description}</p>
                    </div>)}
            </Modal>
            <div className={classBlock}>
                <div className="flex items-center justify-center self-start transform translate-y-[6px]">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={handleCheckboxChange}
                        className="mr-[12px] lg:mr-[20px] custom-checkbox h-[10px] w-[10px] lg:h-[24px] lg:w-[24px] focus:outline-none"
                    />
                </div>
                <div className="flex-grow">
                    <p className="break-words w-[150px] lg:w-auto lg:text-[20px]">{text}</p>
                </div>
                <button className={classButton}>
                    {price}$
                </button>
                <button
                    className=" transition-transform transform-gpu duration-[400ms] hover:scale-[1.2] w-5 h-5 lg:w-[26px] lg:h-[26px] lg:text-[16px] border-solid border-[3px] border-white rounded-full text-white flex justify-center items-center"
                    onClick={() => setIsModalVisible(true)}
                >
                    i
                </button>


            </div>
        </>


    );
}





export function Modal({ isVisible, onClose, children }) {
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

    useEffect(() => {
        const modalElement = document.getElementById('customModal');

        const handleScroll = () => {
            if (modalElement.scrollHeight - modalElement.scrollTop === modalElement.clientHeight) {
                setIsScrolledToEnd(true);
            } else {
                setIsScrolledToEnd(false);
            }
        };

        if (modalElement) {
            modalElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div id="customModal" className="modal custom-scrollbar overflow-y-auto w-[75%] h-[75%] bg-proposition-gradient p-8 relative border-4 border-propositionBorder">
                <button
                    className="block absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    <img className="white-cross" src="/src/assets/whiteCross.svg" alt="Close" />
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}


