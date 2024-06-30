
export default function Subject({ subject, isLast }) {
    return (
        <ol className={`flex flex-col relative ${isLast ? '' : 'mb-[60px]'} lg:mb-0 z-30 lg:w-[372px]`}>
            <div className=" flex-grow mb-[10px] lg:mb-[20px]">

                {subject.slice(0, -1).map((item, index) => (

                    <li key={index} className="vs__text  mb-3"><span className="font-daysOne">{item.subText}</span>{item.text}</li>
                ))}

            </div>
            <img className="self-center object-cover lg:self-start vs__image" src={subject.find(item => item.image)?.image} alt="" />
        </ol>
        // ${isLast ? '' : 'mb-[60px]'} 
    );
}
