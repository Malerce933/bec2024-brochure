import Title from "../Title";
import { PROPOSITIONS, ADDITIONAL_PROPOSITIONS } from "/src/data.js";
import Purchase from "./Purchase";
import emailjs from 'emailjs-com';
import { useState, useEffect } from "react";

export default function Basket({ selectedPropositions, handleRemoveProposition }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [companyName, setCompanyName] = useState("");
    const [emailName, setEmailName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [companyError, setCompanyError] = useState("");

    function handleChangeName(event) {


        setCompanyName(event.target.value);
        // Очищуємо текстове повідомлення про помилку, якщо користувач виправив значення
        setCompanyError("");
    }

    function handleChangeEmail(event) {
        setEmailName(event.target.value);
        // Очищуємо текстове повідомлення про помилку, якщо користувач виправив значення
        setEmailError("");
    }

    let sum = selectedPropositions.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.price);
    }, 0);
    const hasThreePropositions = selectedPropositions.filter(item => !item.isSub).length === 3;
    if (hasThreePropositions) {
        sum -= sum * 0.1;
    }

    const templateId = 'template_1jalcpl';
    const userId = "-GOmILJetd9lnCKs8";

    const sendEmail = () => {
        if (!emailName || !companyName) {
            if (!emailName) {
                setEmailError("Будь ласка, введіть електронну пошту");
            }
            if (!companyName) {
                setCompanyError("Будь ласка, введіть назву компанії");
            }
            return;
        }

        if (!validateEmail(emailName)) {
            setEmailError("Будь ласка, введіть коректну електронну пошту");
            return;
        }

        emailjs.send('service_6vhjdu7', templateId, {
            company: companyName,
            email: emailName,
            propositions: selectedPropositions.map(proposition => proposition.title + ": " + proposition.price),
            totalPrice: sum
        }, userId)
            .then((response) => {
                console.log('Лист успішно надісланий!', response.status, response.text);
            }, (error) => {
                console.log('Виникла помилка під час надсилання листа:', error);
            });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Викликати функцію для надсилання листа


    const basket = <div className="text-white mx-[50px] self-center lg:self-start flex flex-col border-2 border-white p-[30px] mb-[30px] w-[380px] lg:w-[380px] h-auto lg:max-h-[330px]">
        <div>
            <input id='email' onChange={handleChangeEmail} className="pl-[22px] mb-3 lg:text-[16px] h-[48px] lg:h-[59px] w-full placeholder:text-borderButton border-borderButton border-[1px] bg-blackBg" type="text" name="" placeholder="Введіть пошту" />
            <div className="text-red-500 mb-2">{emailError}</div>
        </div>
        <div>
            <input id='company' onChange={handleChangeName} className="pl-[22px] mb-3 lg:text-[16px] h-[48px] lg:h-[59px] w-full placeholder:text-borderButton border-borderButton border-[1px] bg-blackBg" type="text" name="" placeholder="Введіть назву компанії" />
            <div className="text-red-500">{companyError}</div>
        </div>
        <button onClick={sendEmail} className="mt-[30px] self-center text-white border-2 border-white flex justify-center items-center h-[40px] w-[161px] lg:h-[40px] lg:w-[195px] transition-transform transform-gpu duration-[400ms] hover:scale-[1.1]">Оформити</button>
    </div>

    return (
        <>
            <Title className=" text-center lg:text-center mx-[100px] mb-[25px] lg:mb-[54px]">КОШИК</Title>
            <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-[160px] lg:mb-[150px]">
                <div className="text-white mx-[30px] flex flex-col  lg:w-[570px]">

                    <div>
                        <div className=" text-[24px] lg:text-[36px] font-daysOne mb-[20px] ">Пакети</div>
                        <ol>
                            {selectedPropositions.map((item, index) => (
                                !item.isSub && (
                                    <Purchase handleRemoveProposition={handleRemoveProposition} key={index} name={item.title} price={item.price} />
                                )
                            ))}
                        </ol>
                    </div>
                    <div>
                        <div className=" text-[24px] lg:text-[36px] font-daysOne mb-[30px] ">Опції</div>
                        <ol>
                            {selectedPropositions.map((item, index) => (
                                item.isSub && (
                                    <Purchase handleRemoveProposition={handleRemoveProposition} key={index} name={item.title} price={item.price} />
                                )
                            ))}


                        </ol>
                    </div>

                    <div className="flex justify-between  lg:mb-[100px]">
                        <div className=" text-[24px] lg:text-[36px] font-daysOne mb-[32px] ">Total:</div>
                        <div className=" flex justify-center items-center h-[32px] w-[112px] lg:h-[43px] lg:w-[160px]  bg-proposition-button text-[18px] font-daysOne border-propositionBorder border-2 lg:text-[24px]">{sum + "$"}</div>
                    </div>
                    {isMobile && basket}
                    <div className=" text-white  mb-[150px] ">
                        <div className=" text-[24px] mb-[12px] font-daysOne ">Акції</div>
                        <ol className=" text-[12px] lg:text-[16px] w-[60%] lg:w-auto">
                            <li className="mb-[5px]"><span className=" text-orange-400">-10%</span> при купівлі 3–х пакетів.</li>
                            <li className="mb-[5px]"><span className=" text-orange-400">-5%</span> для компаній–партнерів EBEC’2021 та/або BEC’2023 (застосовується після узгодження з організаторами).</li>
                            <li className="mb-[5px]"><span className=" text-orange-400">-10%</span>  для всіх партнерів, що працюють у сфері military та military–tech (застосовується після узгодження з організаторами)</li>
                            <li className="mb-[5px]">*Знижки не поєднуються.</li>
                        </ol>

                    </div>

                </div>
                {!isMobile && basket}


            </div>


        </>
    );
}