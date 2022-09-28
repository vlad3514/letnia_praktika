import { useState } from "react";
import './banner.css';

export default function Banner(data) {

    const { socket } = data;

    const [content, setContent] = useState(<div />);
    const [className, setClassName] = useState('');
    const [count, updateCount] = useState(0);

    const interval = 1500;

    socket.on('showContent', showContent);

    function Content(data) {
        const { contents, imgLink } = data;
        return (
            <div >
                <div>{contents.map((elem, index) => {
                    if (elem.content === 'ВАЗ') {
                        return (
                            <div className={elem.className} key={index}>
                                {elem.content},
                                {' ' + contents[index + 1].content},
                                {' ' + contents[index + 2].content},
                                {contents[index + 3].content}
                            </div>
                        );
                    } else {
                        if (!(elem.content === 'ГАЗ' || elem.content === 'УАЗ' || elem.content === 'ЛАДА')) {
                            return (
                                <div className={elem.className} key={index}>{elem.content}</div>
                            )
                        }
                    }

                })}</div>
                <img className='autoParts' src={imgLink.link} />
            </div>
        )
    }

    function showContent(data) {

        const { contentList, imgLink } = data;

        let i = 0;

        const changeContent = setInterval(() => {
            if (contentList[i]) {
                setContent(contentList[i].content);
                setClassName(contentList[i].className);
            }
            i++;

            if (i > contentList.length) {
                setContent(<Content contents={contentList} imgLink={imgLink} />);
                updateCount(0);
                clearInterval(changeContent);
            }
        }, interval);
    }

    return (
        <div>
            <div>
                <button className="showBtn" onClick={() => {
                    if (count == 0) {
                        socket.emit('getAllContent');
                        updateCount(1);
                    }
                }}>Показать</button>
            </div>
            <div style={{ marginTop: '10%' }}>
                <div className={className}>{content}</div>
            </div>
            <div>

            </div>
        </div>
    )
}